import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import 'auth_page.dart';

class WelcomePageContent extends StatelessWidget {
  const WelcomePageContent({super.key, required this.onSignedIn});

  final Future<void> Function(Map<String, dynamic>) onSignedIn;

  void _openAuth(BuildContext context, {required bool login}) {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (_) => AuthPage(onSuccess: onSignedIn, initialIsLogin: login),
    ));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        body: SafeArea(
          child: SingleChildScrollView(
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 560),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 8, 20, 22),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(children: [
                        Container(
                          width: 39,
                          height: 39,
                          decoration: BoxDecoration(
                            color: const Color(0xFFF2E3E1),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: const Icon(Icons.auto_awesome_rounded, color: violet, size: 21),
                        ),
                        const SizedBox(width: 10),
                        const Text('QuizApp', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                        const Spacer(),
                        TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Log in')),
                        const SizedBox(width: 3),
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
                      const SizedBox(height: 18),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(21),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1E3E1),
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                              decoration: BoxDecoration(color: Colors.white.withValues(alpha: .8), borderRadius: BorderRadius.circular(20)),
                              child: const Text('SHORT QUIZZES. STEADY PROGRESS.', style: TextStyle(color: violet, fontSize: 9, letterSpacing: .6, fontWeight: FontWeight.w800)),
                            ),
                            const SizedBox(height: 18),
                            const Text(
                              'Learn something\nnew, one quiz at\na time.',
                              style: TextStyle(color: ink, fontSize: 32, height: 1.04, fontWeight: FontWeight.w800, letterSpacing: -.7),
                            ),
                            const SizedBox(height: 12),
                            const Text(
                              'QuizApp helps you practice topics with quick question sets. Choose a quiz, answer at your own pace, and review your score and past results.',
                              style: TextStyle(color: Color(0xFF75696A), fontSize: 13, height: 1.5),
                            ),
                            const SizedBox(height: 19),
                            const _QuestionPreview(),
                          ],
                        ),
                      ),
                      const SizedBox(height: 23),
                      const Text('Everything you need to practice', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 5),
                      const Text('A simple loop: pick a subject, take a quiz, check your results.', style: TextStyle(color: muted, fontSize: 12)),
                      const SizedBox(height: 14),
                      const _StepCard(
                        number: '01',
                        title: 'Choose a topic',
                        detail: 'Browse the available subjects and start with what interests you.',
                        tint: Color(0xFFF4E5E3),
                        icon: Icons.explore_rounded,
                      ),
                      const SizedBox(height: 9),
                      const _StepCard(
                        number: '02',
                        title: 'Answer at your pace',
                        detail: 'Work through quiz questions and see how well you know the topic.',
                        tint: Color(0xFFF6EBDD),
                        icon: Icons.edit_note_rounded,
                      ),
                      const SizedBox(height: 9),
                      const _StepCard(
                        number: '03',
                        title: 'Review your progress',
                        detail: 'Check your scores and revisit your quiz history whenever you like.',
                        tint: Color(0xFFEAF1E9),
                        icon: Icons.insights_rounded,
                      ),
                      const SizedBox(height: 16),
                      const Center(
                        child: Text(
                          'Make a little time for what you want to learn.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: muted, fontSize: 12, fontStyle: FontStyle.italic),
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
                padding: const EdgeInsets.fromLTRB(20, 11, 20, 7),
                decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFFEAE4E2)))),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  SizedBox(
                    width: double.infinity,
                    height: 48,
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

class _QuestionPreview extends StatelessWidget {
  const _QuestionPreview();

  @override
  Widget build(BuildContext context) => Container(
        width: double.infinity,
        padding: const EdgeInsets.all(13),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(17)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            const Icon(Icons.quiz_outlined, color: violet, size: 17),
            const SizedBox(width: 7),
            const Text('QUICK QUESTION', style: TextStyle(color: muted, fontSize: 9, letterSpacing: .7, fontWeight: FontWeight.w800)),
            const Spacer(),
            Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: const Color(0xFFF8F1EF), borderRadius: BorderRadius.circular(12)), child: const Text('1 / 5', style: TextStyle(color: violet, fontSize: 9, fontWeight: FontWeight.w700))),
          ]),
          const SizedBox(height: 9),
          const Text('Which planet is known as the Red Planet?', style: TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w700)),
          const SizedBox(height: 9),
          Row(children: [
            _AnswerChip(label: 'Earth', selected: false),
            const SizedBox(width: 7),
            _AnswerChip(label: 'Mars', selected: true),
            const SizedBox(width: 7),
            _AnswerChip(label: 'Venus', selected: false),
          ]),
        ]),
      );
}

class _AnswerChip extends StatelessWidget {
  const _AnswerChip({required this.label, required this.selected});
  final String label;
  final bool selected;

  @override
  Widget build(BuildContext context) => Expanded(
        child: Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.symmetric(vertical: 7, horizontal: 4),
          decoration: BoxDecoration(
            color: selected ? const Color(0xFFF3E4E4) : const Color(0xFFFAF8F7),
            borderRadius: BorderRadius.circular(9),
            border: Border.all(color: selected ? violet : const Color(0xFFECE7E5)),
          ),
          child: Text(label, style: TextStyle(color: selected ? violet : muted, fontSize: 10, fontWeight: selected ? FontWeight.w700 : FontWeight.w500)),
        ),
      );
}

class _StepCard extends StatelessWidget {
  const _StepCard({required this.number, required this.title, required this.detail, required this.tint, required this.icon});
  final String number;
  final String title;
  final String detail;
  final Color tint;
  final IconData icon;

  @override
  Widget build(BuildContext context) => Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 11),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: const Color(0xFFECE7E5))),
        child: Row(children: [
          Container(width: 41, height: 41, decoration: BoxDecoration(color: tint, borderRadius: BorderRadius.circular(13)), child: Icon(icon, color: violet, size: 19)),
          const SizedBox(width: 11),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [Text(number, style: const TextStyle(color: violet, fontSize: 9, fontWeight: FontWeight.w800)), const SizedBox(width: 7), Text(title, style: const TextStyle(color: ink, fontSize: 12, fontWeight: FontWeight.w700))]),
            const SizedBox(height: 3),
            Text(detail, style: const TextStyle(color: muted, fontSize: 10, height: 1.25)),
          ])),
        ]),
      );
}

class WelcomePageScreen extends StatelessWidget {
  const WelcomePageScreen({super.key, required this.onSignedIn});
  final Future<void> Function(Map<String, dynamic>) onSignedIn;

  void _openAuth(BuildContext context, {required bool login}) {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (_) => AuthPage(onSuccess: onSignedIn, initialIsLogin: login),
    ));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        body: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(18, 10, 18, 20),
            children: [
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 560),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(children: [
                        Container(
                          width: 39,
                          height: 39,
                          decoration: BoxDecoration(color: const Color(0xFFF2E3E1), borderRadius: BorderRadius.circular(14)),
                          child: const Icon(Icons.auto_awesome_rounded, color: violet, size: 21),
                        ),
                        const SizedBox(width: 10),
                        const Text('QuizApp', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                        const Spacer(),
                        TextButton(onPressed: () => _openAuth(context, login: true), child: const Text('Log in')),
                        const SizedBox(width: 3),
                        FilledButton(
                          onPressed: () => _openAuth(context, login: false),
                          style: FilledButton.styleFrom(backgroundColor: violet, foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13))),
                          child: const Text('Sign up'),
                        ),
                      ]),
                      const SizedBox(height: 18),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(21),
                        decoration: BoxDecoration(color: const Color(0xFFF1E3E1), borderRadius: BorderRadius.circular(25)),
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                            decoration: BoxDecoration(color: Colors.white.withValues(alpha: .8), borderRadius: BorderRadius.circular(20)),
                            child: const Text('SHORT QUIZZES. STEADY PROGRESS.', style: TextStyle(color: violet, fontSize: 9, letterSpacing: .6, fontWeight: FontWeight.w800)),
                          ),
                          const SizedBox(height: 18),
                          const Text('Learn something\nnew, one quiz at\na time.', style: TextStyle(color: ink, fontSize: 32, height: 1.04, fontWeight: FontWeight.w800, letterSpacing: -.7)),
                          const SizedBox(height: 12),
                          const Text('QuizApp lets you choose a topic, answer quiz questions, and review your score and previous results.', style: TextStyle(color: Color(0xFF75696A), fontSize: 13, height: 1.5)),
                          const SizedBox(height: 19),
                          const _QuestionPreview(),
                        ]),
                      ),
                      const SizedBox(height: 23),
                      const Text('How it works', style: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 5),
                      const Text('Practice a subject and keep track of what you have learned.', style: TextStyle(color: muted, fontSize: 12)),
                      const SizedBox(height: 14),
                      const _StepCard(number: '01', title: 'Choose a topic', detail: 'Browse the available subjects and pick one to try.', tint: Color(0xFFF4E5E3), icon: Icons.explore_rounded),
                      const SizedBox(height: 9),
                      const _StepCard(number: '02', title: 'Answer the questions', detail: 'Work through a quiz at your own pace.', tint: Color(0xFFF6EBDD), icon: Icons.edit_note_rounded),
                      const SizedBox(height: 9),
                      const _StepCard(number: '03', title: 'Review your score', detail: 'See your results and revisit your quiz history.', tint: Color(0xFFEAF1E9), icon: Icons.insights_rounded),
                      const SizedBox(height: 16),
                      const Center(child: Text('Pick a topic. Take a quiz. See your progress.', textAlign: TextAlign.center, style: TextStyle(color: muted, fontSize: 12))),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: SafeArea(
          child: Center(
            heightFactor: 1,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 560),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(20, 11, 20, 7),
                decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFFEAE4E2)))),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  SizedBox(
                    width: double.infinity,
                    height: 48,
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
