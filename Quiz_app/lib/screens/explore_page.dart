import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class TopicListPage extends StatefulWidget {
  const TopicListPage({super.key, required this.onTopic});
  final ValueChanged<String> onTopic;

  @override
  State<TopicListPage> createState() => _TopicListPageState();
}

class _TopicListPageState extends State<TopicListPage> {
  final search = TextEditingController();
  final customTopic = TextEditingController();
  String query = '';
  final topics = const [
    ('JavaScript', 'Technology', Icons.javascript_rounded, violet),
    (
      'Python programming',
      'Technology',
      Icons.terminal_rounded,
      violet,
    ),
    ('The solar system', 'Science', Icons.public_rounded, violet),
    ('Human biology', 'Science', Icons.biotech_rounded, violet),
    (
      'World history',
      'History',
      Icons.account_balance_rounded,
      violet,
    ),
    (
      'Basic algebra',
      'Mathematics',
      Icons.functions_rounded,
      violet,
    ),
  ];

  @override
  void dispose() {
    search.dispose();
    customTopic.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final shown = topics
        .where(
          (item) =>
              item.$1.toLowerCase().contains(query.toLowerCase()) ||
              item.$2.toLowerCase().contains(query.toLowerCase()),
        )
        .toList();
    return SafeArea(
      child: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(22, 20, 22, 24),
            sliver: SliverList.list(
              children: [
                const Text(
                  'Explore',
                  style: TextStyle(
                    color: ink,
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Choose a subject, then pick what to learn.',
                  style: TextStyle(color: muted, fontSize: 14),
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: search,
                  onChanged: (value) => setState(() => query = value),
                  decoration: InputDecoration(
                    hintText: 'Search subjects or topics',
                    prefixIcon: const Icon(Icons.search_rounded, color: violet),
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFECE6E5)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFECE6E5)),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: customTopic,
                        textInputAction: TextInputAction.done,
                        onSubmitted: (value) {
                          if (value.trim().isNotEmpty)
                            widget.onTopic(value.trim());
                        },
                        decoration: InputDecoration(
                          hintText: 'Or enter any topic',
                          prefixIcon: const Icon(Icons.edit_note_rounded, color: violet),
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(15),
                            borderSide: const BorderSide(
                              color: Color(0xFFECE6E5),
                            ),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(15),
                            borderSide: const BorderSide(
                              color: Color(0xFFECE6E5),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton.filled(
                      style: IconButton.styleFrom(
                        backgroundColor: violet,
                        foregroundColor: Colors.white,
                      ),
                      onPressed: () {
                        if (customTopic.text.trim().isNotEmpty)
                          widget.onTopic(customTopic.text.trim());
                      },
                      icon: const Icon(Icons.arrow_forward_rounded),
                    ),
                  ],
                ),
                const SizedBox(height: 22),
                Text(
                  '${shown.length} topics to explore',
                  style: const TextStyle(
                    color: ink,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 11),
                ...shown.map(
                  (item) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: TopicCard(
                      title: item.$1,
                      detail: '${item.$2} · AI-generated quiz',
                      icon: item.$3,
                      color: item.$4,
                      onTap: () => widget.onTopic(item.$1),
                    ),
                  ),
                ),
                if (shown.isEmpty)
                  const Padding(
                    padding: EdgeInsets.all(30),
                    child: Center(
                      child: Text(
                        'No matching topics yet.',
                        style: TextStyle(color: muted),
                      ),
                    ),
                  ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(17),
                  decoration: BoxDecoration(
                    color: violet.withValues(alpha: .08),
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.auto_awesome_rounded, color: violet),
                      SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Have something else in mind? Your quiz can be about any topic.',
                          style: TextStyle(
                            color: ink,
                            fontSize: 13,
                            height: 1.4,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
