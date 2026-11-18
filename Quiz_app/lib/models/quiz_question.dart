class QuizQuestion {
  const QuizQuestion({
    required this.question,
    required this.options,
    required this.answer,
  });
  final String question;
  final List<String> options;
  final String answer;

  String get correctAnswerText {
    final answerIndex = 'ABCD'.indexOf(answer.trim().toUpperCase());
    if (answerIndex >= 0 && answerIndex < options.length) {
      return options[answerIndex];
    }
    return answer;
  }

  String get correctAnswerDisplay {
    final answerIndex = 'ABCD'.indexOf(answer.trim().toUpperCase());
    if (answerIndex >= 0 && answerIndex < options.length) {
      final letter = 'ABCD'[answerIndex];
      return '$letter. ${options[answerIndex]}';
    }
    return answer;
  }

  bool isCorrect(String? selected) {
    if (selected == null) return false;
    final selectedIndex = options.indexOf(selected);
    final correctIndex = 'ABCD'.indexOf(answer.trim().toUpperCase());
    if (correctIndex >= 0 && correctIndex < options.length)
      return selectedIndex == correctIndex;
    return selected.trim().toLowerCase() == answer.trim().toLowerCase();
  }

  factory QuizQuestion.fromJson(Map<String, dynamic> json) => QuizQuestion(
    question: json['question']?.toString() ?? '',
    options: (json['options'] as List? ?? [])
        .map((item) => item.toString())
        .toList(),
    answer: json['answer']?.toString() ?? '',
  );
}
