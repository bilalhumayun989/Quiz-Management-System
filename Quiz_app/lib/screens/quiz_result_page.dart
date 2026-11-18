import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../core/quiz_api.dart';
import '../models/quiz_question.dart';
import '../models/quiz_session_result.dart';
import '../theme/app_theme.dart';
import 'quiz_page.dart';

class QuizResultPage extends StatefulWidget {
  const QuizResultPage({
    super.key,
    required this.result,
    required this.onSaved,
  });
  final QuizSessionResult result;
  final Future<void> Function() onSaved;
  @override
  State<QuizResultPage> createState() => _QuizResultPageState();
}

class _QuizResultPageState extends State<QuizResultPage> {
  bool saving = false, saved = false;
  String? error;

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    final id = prefs.getString('userId');
    setState(() {
      saving = true;
      error = null;
    });
    try {
      if (id == null)
        throw Exception('Please sign in again to save your result.');
      await QuizApi.post('/api/result/submit', {
        'userId': id,
        'topic': widget.result.topic,
        'score': widget.result.score,
        'totalQuestions': widget.result.questions.length,
        'correctAnswers': widget.result.correctAnswers,
        'wrongAnswers': widget.result.wrongAnswers,
      });
      await widget.onSaved();
      if (mounted) setState(() => saved = true);
      if (mounted)
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Quiz result saved.')));
    } catch (e) {
      if (mounted)
        setState(() => error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => saving = false);
    }
  }

  Future<void> _tryMore() async {
    setState(() {
      saving = true;
      error = null;
    });
    try {
      final data = await QuizApi.post('/api/questions/more', {
        'topic': widget.result.topic,
        'exclude': widget.result.questions
            .map((question) => question.question)
            .toList(),
      });
      final questions = (data['questions'] as List? ?? [])
          .map(
            (item) =>
                QuizQuestion.fromJson(Map<String, dynamic>.from(item as Map)),
          )
          .toList();
      if (questions.isEmpty)
        throw Exception('No more questions are available for this topic.');
      if (!mounted) return;
      final next = await Navigator.of(context).push<QuizSessionResult>(
        MaterialPageRoute(
          builder: (_) =>
              QuizTakingPage(topic: widget.result.topic, questions: questions),
        ),
      );
      if (next != null && mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute<void>(
            builder: (_) =>
                QuizResultPage(result: next, onSaved: widget.onSaved),
          ),
        );
      }
    } catch (e) {
      if (mounted)
        setState(() => error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final result = widget.result;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quiz results'),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(22),
          children: [
            Container(
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF5145CD), Color(0xFF8175F3)],
                ),
                borderRadius: BorderRadius.circular(23),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'YOUR SCORE',
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 11,
                      letterSpacing: 1.1,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 7),
                  Text(
                    '${result.score} / ${result.questions.length}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 39,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  Text(
                    result.topic,
                    style: const TextStyle(color: Colors.white70),
                  ),
                  const SizedBox(height: 14),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(5),
                    child: LinearProgressIndicator(
                      value: result.score / result.questions.length,
                      minHeight: 8,
                      backgroundColor: Colors.white24,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Text(
              '${result.correctAnswers.length} correct | ${result.wrongAnswers.length} to practice',
              style: const TextStyle(color: ink, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...result.questions.asMap().entries.map((entry) {
              final answer = result.answers[entry.key];
              final correct = entry.value.isCorrect(answer);
              return Container(
                margin: const EdgeInsets.only(bottom: 9),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15),
                  border: Border.all(color: const Color(0xFFECECF2)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      entry.value.question,
                      style: const TextStyle(
                        color: ink,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 6),
                    if (correct)
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(
                            Icons.check_circle_rounded,
                            color: Color(0xFF16845B),
                            size: 16,
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text.rich(
                              TextSpan(
                                style: const TextStyle(fontSize: 12, height: 1.4),
                                children: [
                                  const TextSpan(
                                    text: 'Your answer is correct: ',
                                    style: TextStyle(
                                      color: Color(0xFF16845B),
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                  TextSpan(
                                    text: entry.value.correctAnswerText,
                                    style: const TextStyle(color: ink),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      )
                    else ...[
                      _AnswerLine(
                        label: 'Your answer',
                        answer: answer ?? 'Not Attempted',
                        color: const Color(0xFFB54745),
                      ),
                      const SizedBox(height: 4),
                      _AnswerLine(
                        label: 'Correct answer',
                        answer: entry.value.correctAnswerText,
                        color: const Color(0xFF16845B),
                      ),
                    ],
                  ],
                ),
              );
            }),
            if (error != null)
              Text(error!, style: const TextStyle(color: Color(0xFFB42318))),
            const SizedBox(height: 8),
            SizedBox(
              height: 50,
              child: FilledButton(
                onPressed: saved || saving ? null : _save,
                child: Text(
                  saved
                      ? 'Saved to your progress'
                      : saving
                      ? 'Saving...'
                      : 'Save result',
                ),
              ),
            ),
            const SizedBox(height: 7),
            OutlinedButton(
              onPressed: saving ? null : _tryMore,
              child: const Text('Try more questions'),
            ),
            const SizedBox(height: 7),
            TextButton(
              onPressed: () =>
                  Navigator.of(context).popUntil((route) => route.isFirst),
              child: const Text('Back to home'),
            ),
          ],
        ),
      ),
    );
  }
}

class _AnswerLine extends StatelessWidget {
  const _AnswerLine({
    required this.label,
    required this.answer,
    required this.color,
  });

  final String label;
  final String answer;
  final Color color;

  @override
  Widget build(BuildContext context) => Text.rich(
        TextSpan(
          style: const TextStyle(fontSize: 12, height: 1.4),
          children: [
            TextSpan(
              text: '$label: ',
              style: TextStyle(color: color, fontWeight: FontWeight.w700),
            ),
            TextSpan(text: answer, style: const TextStyle(color: ink)),
          ],
        ),
      );
}
