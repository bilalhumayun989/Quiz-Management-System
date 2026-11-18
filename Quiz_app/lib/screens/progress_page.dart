import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class ProgressPage extends StatelessWidget {
  const ProgressPage({
    super.key,
    required this.signedIn,
    required this.stats,
    required this.history,
    required this.onRefresh,
  });
  final bool signedIn;
  final Map<String, dynamic>? stats;
  final List<dynamic> history;
  final Future<void> Function() onRefresh;

  @override
  Widget build(BuildContext context) {
    if (!signedIn)
      return const SafeArea(
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(28),
            child: Text(
              'Sign in to see your quiz scores and learning progress.',
              textAlign: TextAlign.center,
              style: TextStyle(color: muted),
            ),
          ),
        ),
      );
    return SafeArea(
      child: RefreshIndicator(
        onRefresh: onRefresh,
        child: ListView(
          padding: const EdgeInsets.all(22),
          children: [
            const SizedBox(height: 8),
            const Text(
              'Your progress',
              style: TextStyle(
                color: ink,
                fontSize: 27,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 7),
            const Text(
              'Your learning journey, one quiz at a time.',
              style: TextStyle(color: muted),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: _StatCard(
                    label: 'Quizzes',
                    value: '${stats?['totalQuizzes'] ?? 0}',
                    icon: Icons.quiz_outlined,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _StatCard(
                    label: 'Average',
                    value: '${stats?['avgScore'] ?? 0}%',
                    icon: Icons.show_chart_rounded,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: _StatCard(
                    label: 'Best score',
                    value: '${stats?['bestScore'] ?? 0}%',
                    icon: Icons.emoji_events_outlined,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _StatCard(
                    label: 'Correct',
                    value: '${stats?['totalCorrect'] ?? 0}',
                    icon: Icons.check_circle_outline_rounded,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Recent quizzes',
              style: TextStyle(
                color: ink,
                fontSize: 17,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 12),
            if (history.isEmpty)
              const Text(
                'Finish your first quiz and it will show up here.',
                style: TextStyle(color: muted),
              )
            else
              ...history.take(20).map((item) {
                final row = Map<String, dynamic>.from(item as Map);
                return Padding(
                  padding: const EdgeInsets.only(bottom: 9),
                  child: TopicCard(
                    title: row['topic']?.toString() ?? 'Quiz',
                    detail:
                        '${row['score'] ?? 0}/${row['totalQuestions'] ?? 0} correct  Ã‚Â·  ${_formatDate(row['createdAt'])}',
                    icon: Icons.history_rounded,
                    color: violet,
                    onTap: () => showModalBottomSheet<void>(
                      context: context,
                      showDragHandle: false,
                      isScrollControlled: true,
                      useSafeArea: true,
                      builder: (_) => DraggableScrollableSheet(
                        expand: false,
                        initialChildSize: .62,
                        minChildSize: .38,
                        maxChildSize: .94,
                        builder: (context, controller) => _HistoryDetails(
                          result: row,
                          scrollController: controller,
                        ),
                      ),
                    ),
                  ),
                );
              }),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.label,
    required this.value,
    required this.icon,
  });
  final String label, value;
  final IconData icon;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(15),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(17),
      border: Border.all(color: const Color(0xFFECECF2)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: violet, size: 21),
        const SizedBox(height: 10),
        Text(
          value,
          style: const TextStyle(
            color: ink,
            fontSize: 21,
            fontWeight: FontWeight.w800,
          ),
        ),
        Text(label, style: const TextStyle(color: muted, fontSize: 11)),
      ],
    ),
  );
}

String _formatDate(dynamic raw) {
  final date = DateTime.tryParse(raw?.toString() ?? '');
  return date == null ? '' : '${date.month}/${date.day}/${date.year}';
}

class _HistoryDetails extends StatelessWidget {
  const _HistoryDetails({
    required this.result,
    required this.scrollController,
  });

  final Map<String, dynamic> result;
  final ScrollController scrollController;

  @override
  Widget build(BuildContext context) => SafeArea(
    child: ListView(
      controller: scrollController,
      padding: const EdgeInsets.fromLTRB(22, 12, 22, 28),
      children: [
        Center(
          child: Container(
            width: 38,
            height: 4,
            decoration: BoxDecoration(
              color: const Color(0xFFD9D1D0),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        const SizedBox(height: 18),
        Text(
          result['topic']?.toString() ?? 'Quiz',
          style: const TextStyle(
            color: ink,
            fontWeight: FontWeight.w800,
            fontSize: 20,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'Score ${result['score'] ?? 0} of ${result['totalQuestions'] ?? 0}',
          style: const TextStyle(color: muted),
        ),
        const SizedBox(height: 18),
        const Text(
          'Correct answers',
          style: TextStyle(color: ink, fontWeight: FontWeight.w700),
        ),
        ..._savedAnswerCards(result['correctAnswers'], correct: true),
        const SizedBox(height: 20),
        const Text(
          'Incorrect answers',
          style: TextStyle(color: ink, fontWeight: FontWeight.w700),
        ),
        ..._savedAnswerCards(result['wrongAnswers'], correct: false),
      ],
    ),
  );
}

List<Widget> _savedAnswerCards(dynamic rawAnswers, {required bool correct}) {
  final answers = rawAnswers as List? ?? const [];
  if (answers.isEmpty) {
    return [
      Padding(
        padding: const EdgeInsets.only(top: 9),
        child: Text(
          correct ? 'No correct answers in this quiz.' : 'No incorrect answers. Great work!',
          style: const TextStyle(color: muted, fontSize: 13),
        ),
      ),
    ];
  }

  return answers.map((answer) {
    final item = Map<String, dynamic>.from(answer as Map);
    final options = (item['options'] as List? ?? const [])
        .map((option) => option.toString())
        .toList();
    final rawUser = item['userAnswerText']?.toString().trim() ??
        item['userAnswer']?.toString().trim() ??
        '';
    final userAnswer = _savedAnswerText(rawUser, options);
    final rawCorrect = item['correctAnswerText']?.toString().trim() ?? '';
    final correctAnswer = rawCorrect.isNotEmpty
        ? rawCorrect
        : _savedAnswerText(item['correctAnswer'], options);

    return Container(
      margin: const EdgeInsets.only(top: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: const Color(0xFFECE6E5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            item['question']?.toString() ?? 'Question',
            style: const TextStyle(
              color: ink,
              fontWeight: FontWeight.w600,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 10),
          if (correct)
            _AnswerReviewLine(
              label: 'Your answer is correct',
              answer: userAnswer,
              color: const Color(0xFF16845B),
            )
          else ...[
            _AnswerReviewLine(
              label: 'Your answer',
              answer: userAnswer,
              color: const Color(0xFFB54745),
            ),
            const SizedBox(height: 5),
            _AnswerReviewLine(
              label: 'Correct answer',
              answer: correctAnswer,
              color: const Color(0xFF16845B),
            ),
          ],
        ],
      ),
    );
  }).toList();
}

String _savedAnswerText(dynamic raw, List<String> options) {
  final value = raw?.toString().trim() ?? '';
  if (value.isEmpty || value == 'null') return 'Not attempted';
  final answerIndex = 'ABCD'.indexOf(value.toUpperCase());
  if (answerIndex >= 0) {
    if (answerIndex < options.length) return options[answerIndex];
    return 'Option $value (answer choices were not saved)';
  }
  return value;
}

class _AnswerReviewLine extends StatelessWidget {
  const _AnswerReviewLine({
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
