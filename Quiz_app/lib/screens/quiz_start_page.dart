import 'package:flutter/material.dart';

import '../core/quiz_api.dart';
import '../models/quiz_question.dart';
import '../models/quiz_session_result.dart';
import '../theme/app_theme.dart';
import 'quiz_page.dart';
import 'quiz_result_page.dart';

class TopicPreviewPage extends StatefulWidget {
  const TopicPreviewPage({
    super.key,
    required this.topic,
    required this.onQuizComplete,
  });
  final String topic;
  final Future<void> Function() onQuizComplete;
  @override
  State<TopicPreviewPage> createState() => _TopicPreviewPageState();
}

class _TopicPreviewPageState extends State<TopicPreviewPage> {
  bool loading = false;
  String? error;

  Future<void> _startQuiz() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final data = await QuizApi.post('/api/questions', {
        'topic': widget.topic,
      });
      final questions = (data['questions'] as List? ?? [])
          .map(
            (item) =>
                QuizQuestion.fromJson(Map<String, dynamic>.from(item as Map)),
          )
          .toList();
      if (questions.isEmpty)
        throw Exception('The question service returned no questions.');
      if (!mounted) return;
      final result = await Navigator.of(context).push<QuizSessionResult>(
        MaterialPageRoute(
          builder: (_) =>
              QuizTakingPage(topic: widget.topic, questions: questions),
        ),
      );
      if (result != null && mounted) {
        await Navigator.of(context).push(
          MaterialPageRoute<void>(
            builder: (_) =>
                QuizResultPage(result: result, onSaved: widget.onQuizComplete),
          ),
        );
      }
    } catch (e) {
      if (mounted)
        setState(() => error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Your quiz')),
    body: SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            const Icon(Icons.auto_awesome_rounded, color: violet, size: 36),
            const SizedBox(height: 18),
            Text(
              widget.topic,
              style: const TextStyle(
                color: ink,
                fontSize: 29,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 9),
            const Text(
              'A fresh multiple-choice quiz, generated just for this topic.',
              style: TextStyle(color: muted, fontSize: 15, height: 1.5),
            ),
            const SizedBox(height: 22),
            const _QuizInfo(icon: Icons.quiz_outlined, text: '10 questions'),
            const SizedBox(height: 12),
            const _QuizInfo(icon: Icons.timer_outlined, text: '2 minutes'),
            if (error != null)
              Padding(
                padding: const EdgeInsets.only(top: 18),
                child: Text(
                  error!,
                  style: const TextStyle(color: Color(0xFFB42318)),
                ),
              ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton(
                onPressed: loading ? null : _startQuiz,
                child: loading
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Text('Generate quiz'),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    ),
  );
}

class _QuizInfo extends StatelessWidget {
  const _QuizInfo({required this.icon, required this.text});
  final IconData icon;
  final String text;
  @override
  Widget build(BuildContext context) => Row(
    children: [
      Icon(icon, color: violet, size: 20),
      const SizedBox(width: 10),
      Text(
        text,
        style: const TextStyle(color: ink, fontWeight: FontWeight.w600),
      ),
    ],
  );
}
