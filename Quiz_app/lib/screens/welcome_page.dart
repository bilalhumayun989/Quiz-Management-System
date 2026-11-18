import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import 'auth_page.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key, required this.onSignedIn});

  final Future<void> Function(Map<String, dynamic>) onSignedIn;

  void _openAuth(BuildContext context, {required bool login}) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => AuthPage(
          onSuccess: onSignedIn,
          initialIsLogin: login,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    bottomNavigationBar: SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 12),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          SizedBox(
            width: double.infinity,
            height: 48,
            child: FilledButton(
              onPressed: () => _openAuth(context, login: false),
              style: FilledButton.styleFrom(backgroundColor: violet, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))),
              child: const Text('Create your free account', style: TextStyle(fontWeight: FontWeight.w700)),
            ),
          ),
          const SizedBox(height: 2),
          TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Already have an account? Log in', style: TextStyle(fontSize: 12))),
        ]),
      ),
    ),
    body: SafeArea(
      child: LayoutBuilder(
        builder: (context, constraints) => SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(18, 10, 18, 26),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(children: [
                    Container(
                      width: 37, height: 37,
                      decoration: BoxDecoration(color: const Color(0xFFF3E6E5), borderRadius: BorderRadius.circular(13)),
                      child: const Icon(Icons.auto_awesome_rounded, color: violet, size: 21),
                    ),
                    const SizedBox(width: 9),
                    const Text('QuizApp', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                    const Spacer(),
                    TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Log in')),
                    const SizedBox(width: 2),
                    FilledButton(
                      onPressed: () => _openAuth(context, login: false),
                      style: FilledButton.styleFrom(backgroundColor: violet, foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13))),
                      child: const Text('Sign up'),
                    ),
                  ]),
                  SizedBox(height: constraints.maxHeight < 680 ? 15 : 23),
                  const Text('Your next quiz starts here', style: TextStyle(color: ink, fontSize: 23, fontWeight: FontWeight.w800, letterSpacing: -.4)),
                  const SizedBox(height: 4),
                  const Text('Explore a topic, test what you know, and keep growing.', style: TextStyle(color: muted, fontSize: 12)),
                  const SizedBox(height: 18),
                  Container(
                    height: 151,
                    padding: const EdgeInsets.all(17),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(19),
                      gradient: const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFF352B2D), Color(0xFF655052)]),
                    ),
                    child: Stack(children: [
                      Positioned(right: 2, top: 6, child: Icon(Icons.lightbulb_outline_rounded, size: 79, color: Colors.white.withValues(alpha: .13))),
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        const Text('DAILY BRAIN BOOST', style: TextStyle(color: Color(0xFFF0BFC0), fontSize: 9, letterSpacing: 1, fontWeight: FontWeight.w800)),
                        const Spacer(),
                        const Text('A few questions.\nA sharper mind.', style: TextStyle(color: Colors.white, fontSize: 21, height: 1.12, fontWeight: FontWeight.w800)),
                        const SizedBox(height: 10),
                        InkWell(
                          onTap: () => _openAuth(context, login: false),
                          borderRadius: BorderRadius.circular(20),
                          child: Container(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)), child: const Text('Start exploring  →', style: TextStyle(color: ink, fontSize: 10, fontWeight: FontWeight.w700))),
                        ),
                      ]),
                    ]),
                  ),
                  const SizedBox(height: 19),
                  const Row(children: [Text('Explore categories', style: TextStyle(color: ink, fontSize: 15, fontWeight: FontWeight.w800)), Spacer(), Text('5 topics', style: TextStyle(color: muted, fontSize: 10))]),
                  const SizedBox(height: 12),
                  const SizedBox(
                    height: 72,
                    child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                      _CategoryIcon(icon: Icons.code_rounded, label: 'Tech', tint: Color(0xFFF4E5E3)),
                      _CategoryIcon(icon: Icons.science_outlined, label: 'Science', tint: Color(0xFFEAF1E9)),
                      _CategoryIcon(icon: Icons.public_rounded, label: 'History', tint: Color(0xFFF6EBDD)),
                      _CategoryIcon(icon: Icons.calculate_outlined, label: 'Math', tint: Color(0xFFF5E9EE)),
                      _CategoryIcon(icon: Icons.menu_book_rounded, label: 'Language', tint: Color(0xFFE8EEF3)),
                    ]),
                  ),
                  const SizedBox(height: 16),
                  Row(children: [const Text('Popular quizzes', style: TextStyle(color: ink, fontSize: 15, fontWeight: FontWeight.w800)), const Spacer(), TextButton(onPressed: () => _openAuth(context, login: false), child: const Text('See all', style: TextStyle(fontSize: 11)))]),
                  const SizedBox(height: 2),
                  SizedBox(
                    height: 112,
                    child: ListView(scrollDirection: Axis.horizontal, children: const [
                      _QuizTile(title: 'JavaScript', subtitle: '10 questions · Beginner', icon: Icons.javascript_rounded, color: Color(0xFFF0D68A)),
                      _QuizTile(title: 'The solar system', subtitle: '10 questions · General', icon: Icons.public_rounded, color: Color(0xFFA6B6D8)),
                      _QuizTile(title: 'World history', subtitle: '10 questions · General', icon: Icons.account_balance_rounded, color: Color(0xFFE3B49A)),
                    ]),
                  ),
                  const SizedBox(height: 5),
                  Center(child: TextButton(onPressed: () => _openAuth(context, login: false), child: const Text('Join QuizApp to start a quiz', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)))),
                ],
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

class _CategoryIcon extends StatelessWidget {
  const _CategoryIcon({required this.icon, required this.label, required this.tint});
  final IconData icon;
  final String label;
  final Color tint;
  @override
  Widget build(BuildContext context) => SizedBox(width: 57, child: Column(children: [
    Container(width: 39, height: 39, decoration: BoxDecoration(color: tint, shape: BoxShape.circle), child: Icon(icon, color: violet, size: 19)),
    const SizedBox(height: 5),
    Text(label, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: muted, fontSize: 9, fontWeight: FontWeight.w600)),
  ]));
}

class _QuizTile extends StatelessWidget {
  const _QuizTile({required this.title, required this.subtitle, required this.icon, required this.color});
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  @override
  Widget build(BuildContext context) => Container(
    width: 208,
    margin: const EdgeInsets.only(right: 10),
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: const Color(0xFFECE7E5))),
    child: Row(children: [
      Container(width: 42, height: 42, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(13)), child: Icon(icon, color: ink, size: 22)),
      const SizedBox(width: 10),
      Expanded(child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: ink, fontSize: 11, fontWeight: FontWeight.w800)), const SizedBox(height: 4), Text(subtitle, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: muted, fontSize: 9))])),
    ]),
  );
}
