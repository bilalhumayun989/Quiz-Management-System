import 'dart:async';

import 'package:flutter/material.dart';

import '../models/quiz_question.dart';
import '../models/quiz_session_result.dart';
import '../theme/app_theme.dart';

class QuizTakingPage extends StatefulWidget {
  const QuizTakingPage({super.key, required this.topic, required this.questions});
  final String topic;
  final List<QuizQuestion> questions;
  @override
  State<QuizTakingPage> createState() => _QuizTakingPageState();
}

class _QuizTakingPageState extends State<QuizTakingPage> {
  final Map<int, String> answers = {};
  Timer? timer;
  int secondsLeft = 120;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (secondsLeft <= 1) { timer?.cancel(); _submit(); }
      else if (mounted) setState(() => secondsLeft--);
    });
  }

  @override
  void dispose() { timer?.cancel(); super.dispose(); }

  void _submit() {
    timer?.cancel();
    Navigator.of(context).pop(QuizSessionResult(
      topic: widget.topic,
      questions: widget.questions,
      answers: List.generate(widget.questions.length, (index) => answers[index]),
    ));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: Text(widget.topic), actions: [Padding(padding: const EdgeInsets.only(right: 16), child: Center(child: Text('${secondsLeft ~/ 60}:${(secondsLeft % 60).toString().padLeft(2, '0')}', style: const TextStyle(color: violet, fontWeight: FontWeight.w800))))]),
        body: SafeArea(child: ListView(padding: const EdgeInsets.fromLTRB(20, 8, 20, 28), children: [
          LinearProgressIndicator(value: answers.length / widget.questions.length, color: violet, backgroundColor: violet.withValues(alpha: .12), borderRadius: BorderRadius.circular(5)),
          const SizedBox(height: 18),
          ...widget.questions.asMap().entries.map((entry) => _QuestionCard(index: entry.key, question: entry.value, selected: answers[entry.key], onSelected: (answer) => setState(() => answers[entry.key] = answer))),
          const SizedBox(height: 12),
          SizedBox(height: 52, child: FilledButton(onPressed: _submit, child: const Text('Submit quiz'))),
        ])),
      );
}

class _QuestionCard extends StatelessWidget {
  const _QuestionCard({required this.index, required this.question, required this.selected, required this.onSelected});
  final int index;
  final QuizQuestion question;
  final String? selected;
  final ValueChanged<String> onSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(17),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFECECF2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'QUESTION ${index + 1}',
            style: const TextStyle(
              color: violet,
              fontSize: 10,
              fontWeight: FontWeight.w800,
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            question.question,
            style: const TextStyle(
              color: ink,
              fontSize: 15,
              height: 1.4,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 12),
          ...question.options.map(
            (option) => Padding(
              padding: const EdgeInsets.only(bottom: 7),
              child: InkWell(
                onTap: () => onSelected(option),
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 11,
                  ),
                  decoration: BoxDecoration(
                    color: selected == option
                        ? violet.withValues(alpha: .09)
                        : canvas,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: selected == option
                          ? violet
                          : const Color(0xFFECECF2),
                    ),
                  ),
                  child: Text(
                    option,
                    style: TextStyle(
                      color: ink,
                      fontSize: 13,
                      fontWeight: selected == option
                          ? FontWeight.w700
                          : FontWeight.w400,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
