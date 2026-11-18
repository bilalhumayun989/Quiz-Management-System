import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import 'auth_page.dart';
import 'welcome_page_content.dart';

class LegacyWelcomeLandingPage extends StatelessWidget {
  const LegacyWelcomeLandingPage({super.key, required this.onSignedIn});

  final Future<void> Function(Map<String, dynamic>) onSignedIn;

  void _openAuth(BuildContext context, {required bool login}) {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (_) => AuthPage(onSuccess: onSignedIn, initialIsLogin: login),
    ));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        body: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) => Center(
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxWidth: 560,
                  maxHeight: constraints.maxHeight,
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 8, bottom: 8),
                      child: Row(children: [
                        Container(
                          width: 38,
                          height: 38,
                          decoration: BoxDecoration(
                            color: const Color(0xFFF3E6E5),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: const Icon(Icons.auto_awesome_rounded, color: violet, size: 21),
                        ),
                        const SizedBox(width: 10),
                        const Text('QuizApp', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                        const Spacer(),
                        TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Log in')),
                        const SizedBox(width: 4),
                        FilledButton(
                          onPressed: () => _openAuth(context, login: false),
                          style: FilledButton.styleFrom(
                            backgroundColor: violet,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
                          ),
                          child: const Text('Sign up'),
                        ),
                      ]),
                    ),
                    Expanded(
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.only(top: 18, bottom: 18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(22),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF1E3E1),
                                borderRadius: BorderRadius.circular(26),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                                    decoration: BoxDecoration(color: Colors.white.withValues(alpha: .78), borderRadius: BorderRadius.circular(20)),
                                    child: const Text('QUIZZES THAT FIT YOUR DAY', style: TextStyle(color: violet, fontSize: 9, letterSpacing: .7, fontWeight: FontWeight.w800)),
                                  ),
                                  const SizedBox(height: 20),
                                  const Text(
                                    'Learn more\nwith every quiz.',
                                    style: TextStyle(color: ink, fontSize: 32, height: 1.08, fontWeight: FontWeight.w800, letterSpacing: -.7),
                                  ),
                                  const SizedBox(height: 11),
                                  const Text(
                                    'Choose a topic, answer a quick set of questions, then review your score and progress.',
                                    style: TextStyle(color: Color(0xFF75696A), fontSize: 13, height: 1.5),
                                  ),
                                  const SizedBox(height: 20),
                                  const _MiniCard(),
                                ],
                              ),
                            ),
                            const SizedBox(height: 25),
                            const Text('How QuizApp works', style: TextStyle(color: ink, fontSize: 18, fontWeight: FontWeight.w800)),
                            const SizedBox(height: 6),
                            const Text('Practice a topic and see how you improve over time.', style: TextStyle(color: muted, fontSize: 12)),
                            const SizedBox(height: 16),
                            const _Feature(icon: Icons.explore_rounded, title: 'Choose a quiz topic', detail: 'Browse the available topics and pick one to try.', color: Color(0xFFF4E5E3)),
                            const SizedBox(height: 10),
                            const _Feature(icon: Icons.bolt_rounded, title: 'Fit learning into your day', detail: 'Quick quizzes make every spare minute count.', color: Color(0xFFF6EBDD)),
                            const SizedBox(height: 10),
                            const _Feature(icon: Icons.insights_rounded, title: 'Review your results', detail: 'Track scores and revisit your quiz history.', color: Color(0xFFEAF1E9)),
                          ],
                        ),
                      ),
                    ),
                  ],
                  ),
                ),
              ),
            ),
          ),
        ),
        bottomNavigationBar: SafeArea(
          child: Center(
            heightFactor: 1,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 560),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
                decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFFEAE4E2)))),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  SizedBox(
                    width: double.infinity,
                    height: 49,
                    child: FilledButton(
                      onPressed: () => _openAuth(context, login: false),
                      style: FilledButton.styleFrom(backgroundColor: violet, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))),
                      child: const Text('Create your free account', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                    ),
                  ),
                  const SizedBox(height: 2),
                  TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Already have an account? Log in', style: TextStyle(fontSize: 12))),
                ]),
              ),
            ),
          ),
        ),
      );
}

// Keep the previous route name pointing to the current, scrollable landing page.
class WelcomeLandingPage extends WelcomePageScreen {
  const WelcomeLandingPage({super.key, required super.onSignedIn});
}

class _MiniCard extends StatelessWidget {
  const _MiniCard();

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(13),
        decoration: BoxDecoration(color: Colors.white.withValues(alpha: .82), borderRadius: BorderRadius.circular(17)),
        child: Row(children: [
          Container(
            width: 42,
            height: 42,
            decoration: BoxDecoration(color: const Color(0xFFF8E7C7), borderRadius: BorderRadius.circular(14)),
            child: const Icon(Icons.psychology_alt_rounded, color: Color(0xFFB87937), size: 22),
          ),
          const SizedBox(width: 11),
          const Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Practice, then track progress', style: TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w800)),
              SizedBox(height: 3),
              Text('Scores and history stay in your account.', style: TextStyle(color: muted, fontSize: 10)),
            ]),
          ),
          const Icon(Icons.arrow_forward_rounded, color: violet, size: 19),
        ]),
      );
}

class _Feature extends StatelessWidget {
  const _Feature({required this.icon, required this.title, required this.detail, required this.color});

  final IconData icon;
  final String title;
  final String detail;
  final Color color;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 13, vertical: 12),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(17), border: Border.all(color: const Color(0xFFECE7E5))),
        child: Row(children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(13)),
            child: Icon(icon, color: violet, size: 19),
          ),
          const SizedBox(width: 11),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(title, style: const TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w700)),
              const SizedBox(height: 3),
              Text(detail, style: const TextStyle(color: muted, fontSize: 10)),
            ]),
          ),
          const Icon(Icons.chevron_right_rounded, color: muted, size: 20),
        ]),
      );
}
