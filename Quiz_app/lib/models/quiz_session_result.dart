import 'quiz_question.dart';

class QuizSessionResult {
  const QuizSessionResult({
    required this.topic,
    required this.questions,
    required this.answers,
  });
  final String topic;
  final List<QuizQuestion> questions;
  final List<String?> answers;
  int get score => questions
      .asMap()
      .entries
      .where((entry) => entry.value.isCorrect(answers[entry.key]))
      .length;
  List<Map<String, dynamic>> get correctAnswers => questions
      .asMap()
      .entries
      .where((entry) => entry.value.isCorrect(answers[entry.key]))
      .map(
        (entry) => {
          'question': entry.value.question,
          'userAnswer': answers[entry.key] ?? 'Not Attempted',
        },
      )
      .toList();
  List<Map<String, dynamic>> get wrongAnswers => questions
      .asMap()
      .entries
      .where((entry) => !entry.value.isCorrect(answers[entry.key]))
      .map(
        (entry) {
          final selectedAnswer = answers[entry.key];
          return {
            'question': entry.value.question,
            // Keep the backend's existing result shape, but save the readable
            // correct choice in its String correctAnswer field.
            'correctAnswer': entry.value.correctAnswerDisplay,
            'userAnswer': selectedAnswer ?? 'Not Attempted',
          };
        },
      )
      .toList();
}
