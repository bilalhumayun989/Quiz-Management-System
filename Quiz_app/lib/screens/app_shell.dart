import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../core/quiz_api.dart';
import '../theme/app_theme.dart';
import 'explore_page.dart';
import 'home_page.dart';
import 'profile_page.dart';
import 'progress_page.dart';
import 'quiz_start_page.dart';
import 'welcome_page_content.dart';

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int selectedTab = 0;
  bool signedIn = false;
  String? userId;
  String? userName;
  Map<String, dynamic>? dashboardStats;
  List<dynamic> history = [];
  Map<String, dynamic>? profile;

  @override
  void initState() {
    super.initState();
    _restoreSession();
  }

  Future<void> _restoreSession() async {
    final prefs = await SharedPreferences.getInstance();
    if (!mounted) return;
    setState(() {
      userId = prefs.getString('userId');
      userName = prefs.getString('userName');
      signedIn = prefs.getString('token') != null && userId != null;
    });
    if (signedIn) _refreshUserData();
  }

  Future<void> _refreshUserData() async {
    final id = userId;
    if (!signedIn || id == null) return;
    try {
      final values = await Future.wait([
        QuizApi.get('/api/result/dashboard-stats/$id'),
        QuizApi.get('/api/result/results/$id'),
        QuizApi.get('/api/auth/profile'),
      ]);
      if (!mounted) return;
      setState(() {
        dashboardStats = Map<String, dynamic>.from(values[0] as Map);
        history = values[1] as List<dynamic>;
        profile = Map<String, dynamic>.from(values[2] as Map);
        userName = profile?['name']?.toString() ?? userName;
      });
    } catch (_) {
      // Keep the app usable if statistics are temporarily unavailable.
    }
}

  Future<void> _signedIn(Map<String, dynamic> user) async {
    if (!mounted) return;
    setState(() {
      signedIn = true;
      userId = user['_id']?.toString();
      userName = user['name']?.toString();
    });
    await _refreshUserData();
  }

  Future<void> _signOut() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('userId');
    await prefs.remove('userName');
    if (!mounted) return;
    setState(() {
      signedIn = false;
      userId = null;
      userName = null;
      dashboardStats = null;
      history = [];
      profile = null;
    });
  }

  void openTopic(String topic) {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (_) => TopicPreviewPage(topic: topic, onQuizComplete: _refreshUserData),
    ));
  }

  @override
  Widget build(BuildContext context) {
    if (!signedIn) return WelcomePageScreen(onSignedIn: _signedIn);

    final pages = [
      HomePage(onExplore: () => setState(() => selectedTab = 1), onProgress: () => setState(() => selectedTab = 2), onTopic: openTopic, signedIn: true, userName: userName, stats: dashboardStats),
      TopicListPage(onTopic: openTopic),
      ProgressPage(signedIn: true, stats: dashboardStats, history: history, onRefresh: _refreshUserData),
      ProfilePage(signedIn: true, userName: userName, profile: profile, onProfileUpdated: _refreshUserData, onAuth: () {}, onSignOut: _signOut),
    ];

    return Scaffold(
      body: IndexedStack(index: selectedTab, children: pages),
      bottomNavigationBar: _CurvedBottomNavigation(
        selectedIndex: selectedTab,
        onSelected: (index) => setState(() => selectedTab = index),
      ),
    );
  }
}

class _CurvedBottomNavigation extends StatefulWidget {
  const _CurvedBottomNavigation({
    required this.selectedIndex,
    required this.onSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  State<_CurvedBottomNavigation> createState() =>
      _CurvedBottomNavigationState();
}

class _CurvedBottomNavigationState extends State<_CurvedBottomNavigation>
    with SingleTickerProviderStateMixin {
  static const double _iconSideInset = 18;

  late final AnimationController _controller;
  late final CurvedAnimation _curve;
  late Tween<double> _positionTween;
  late Animation<double> _tabPosition;

  static const _items = [
    (icon: Icons.home_outlined, active: Icons.home_rounded),
    (icon: Icons.explore_outlined, active: Icons.explore_rounded),
    (icon: Icons.bar_chart_rounded, active: Icons.bar_chart_rounded),
    (icon: Icons.person_outline_rounded, active: Icons.person_rounded),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 360),
    );
    _curve = CurvedAnimation(parent: _controller, curve: Curves.easeInOutCubicEmphasized);
    _positionTween = Tween<double>(
      begin: widget.selectedIndex.toDouble(),
      end: widget.selectedIndex.toDouble(),
    );
    _tabPosition = _positionTween.animate(_curve);
  }

  @override
  void didUpdateWidget(covariant _CurvedBottomNavigation oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.selectedIndex != widget.selectedIndex) {
      _positionTween = Tween<double>(
        begin: _tabPosition.value,
        end: widget.selectedIndex.toDouble(),
      );
      _tabPosition = _positionTween.animate(_curve);
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _curve.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(28, 8, 28, 8),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final cellWidth =
                  (constraints.maxWidth - _iconSideInset * 2) / _items.length;
              return AnimatedBuilder(
                animation: _tabPosition,
                builder: (context, _) {
                  final animatedIndex = _tabPosition.value;
                  final centerX =
                      _iconSideInset + (animatedIndex + .5) * cellWidth;
                  return SizedBox(
                    height: 51,
                    child: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        Positioned.fill(
                          child: CustomPaint(
                            painter: _CurvedNavBarPainter(notchCenter: centerX),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: _iconSideInset,
                              ),
                              child: Row(
                                children: List.generate(
                                  _items.length,
                                  (index) {
                                    final item = _items[index];
                                    final selected = index == widget.selectedIndex;
                                    return Expanded(
                                      child: InkWell(
                                        onTap: () => widget.onSelected(index),
                                        borderRadius: BorderRadius.circular(24),
                                        child: SizedBox(
                                          height: 51,
                                          child: AnimatedSlide(
                                            offset: selected
                                                ? const Offset(0, -9 / 51)
                                                : Offset.zero,
                                            duration: const Duration(milliseconds: 220),
                                            curve: Curves.easeOutCubic,
                                            child: Center(
                                              child: AnimatedContainer(
                                                duration: const Duration(milliseconds: 220),
                                                curve: Curves.easeOut,
                                                width: 40,
                                                height: 40,
                                                decoration: BoxDecoration(
                                                  color: selected
                                                      ? const Color(0xFFFFF0F1)
                                                      : Colors.transparent,
                                                  shape: BoxShape.circle,
                                                ),
                                                child: Center(
                                                  child: AnimatedSwitcher(
                                                    duration: const Duration(milliseconds: 160),
                                                    transitionBuilder: (child, animation) =>
                                                        FadeTransition(
                                                      opacity: animation,
                                                      child: child,
                                                    ),
                                                    child: Icon(
                                                      selected ? item.active : item.icon,
                                                      key: ValueKey('$index-$selected'),
                                                      color: selected ? violet : muted,
                                                      size: 30,
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
            },
          ),
        ),
      );
}

class _CurvedNavBarPainter extends CustomPainter {
  const _CurvedNavBarPainter({required this.notchCenter});

  final double notchCenter;

  @override
  void paint(Canvas canvas, Size size) {
    const cornerRadius = 10.0;
    const notchHalfWidth = 37.5;
    const notchDepth = 37.0;
    final center = notchCenter
        .clamp(cornerRadius, size.width - cornerRadius)
        .toDouble();
    // The inset icon row leaves room for the same full notch at both ends.
    final leftWidth = math.min(notchHalfWidth, center - cornerRadius);
    final rightWidth = math.min(notchHalfWidth, size.width - cornerRadius - center);

    final bar = Path()
      ..addRRect(
        RRect.fromRectAndRadius(
          Offset.zero & size,
          const Radius.circular(cornerRadius),
        ),
      );
    final notch = Path()
      ..moveTo(center - leftWidth, 0)
      ..cubicTo(
        center - leftWidth * .42, 0,
        center - leftWidth * .68, notchDepth,
        center, notchDepth,
      )
      ..cubicTo(
        center + rightWidth * .68, notchDepth,
        center + rightWidth * .42, 0,
        center + rightWidth, 0,
      )
      ..lineTo(center - leftWidth, 0)
      ..close();
    final path = Path.combine(PathOperation.difference, bar, notch);

    canvas.drawShadow(path, ink.withValues(alpha: .13), 10, true);
    canvas.drawPath(path, Paint()..color = Colors.white);
    canvas.drawPath(
      path,
      Paint()
        ..color = const Color(0xFFF0E9E8)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );
  }

  @override
  bool shouldRepaint(covariant _CurvedNavBarPainter oldDelegate) =>
      oldDelegate.notchCenter != notchCenter;
}
