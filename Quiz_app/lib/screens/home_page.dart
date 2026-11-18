import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class HomePage extends StatelessWidget {
  const HomePage({
    super.key,
    required this.onExplore,
    required this.onProgress,
    required this.onTopic,
    required this.signedIn,
    required this.userName,
    required this.stats,
  });

  final VoidCallback onExplore;
  final VoidCallback onProgress;
  final ValueChanged<String> onTopic;
  final bool signedIn;
  final String? userName;
  final Map<String, dynamic>? stats;

  @override
  Widget build(BuildContext context) {
    final name = userName?.trim().split(' ').first;
    final greetingName = name == null || name.isEmpty ? 'Learner' : name;
    final initial = greetingName[0].toUpperCase();

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
        children: [
          Row(
            children: [
              Container(
                width: 44,
                height: 44,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  color: Color(0xFFF3E6E5),
                  shape: BoxShape.circle,
                ),
                child: Text(
                  signedIn ? initial : 'Q',
                  style: const TextStyle(
                    color: violet,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const SizedBox(width: 11),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Hey, $greetingName',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: ink,
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      'Ready for a quick quiz?',
                      style: TextStyle(color: muted, fontSize: 12),
                    ),
                  ],
                ),
              ),
              IconButton.filledTonal(
                onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('You are all caught up.')),
                ),
                icon: const Icon(Icons.notifications_none_rounded),
                color: violet,
                tooltip: 'Notifications',
              ),
            ],
          ),
          const SizedBox(height: 22),
          const Text(
            'Find your next quiz',
            style: TextStyle(color: ink, fontSize: 24, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 5),
          Text(
            signedIn && stats != null
                ? '${stats?['totalQuizzes'] ?? 0} quizzes completed | average ${stats?['avgScore'] ?? 0}%'
                : 'Explore a topic, test what you know, and keep growing.',
            style: const TextStyle(color: muted, fontSize: 13, height: 1.4),
          ),
          const SizedBox(height: 20),
          SizedBox(
            height: 157,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _FeatureCard(
                  eyebrow: 'DAILY BRAIN BOOST',
                  title: 'A few questions.\nA sharper mind.',
                  detail: 'Build a little knowledge every day.',
                  buttonLabel: 'Start exploring',
                  icon: Icons.psychology_alt_rounded,
                  onTap: onExplore,
                ),
                const SizedBox(width: 12),
                _FeatureCard(
                  eyebrow: 'YOUR QUIZ JOURNEY',
                  title: 'See how far\nyou have come.',
                  detail: 'Review your scores and past quizzes.',
                  buttonLabel: 'View progress',
                  icon: Icons.insights_rounded,
                  onTap: onProgress,
                ),
              ],
            ),
          ),
          const SizedBox(height: 22),
          SectionTitle(
            title: 'Explore categories',
            action: 'See all',
            onTap: onExplore,
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
                Category(
                  icon: Icons.code_rounded,
                  label: 'Technology',
                  tint: const Color(0xFFF8E9E9),
                  onTap: () => onTopic('Technology'),
                ),
                Category(
                  icon: Icons.science_outlined,
                  label: 'Science',
                  tint: const Color(0xFFF5DEDF),
                  onTap: () => onTopic('Science'),
                ),
                Category(
                  icon: Icons.public_rounded,
                  label: 'History',
                  tint: const Color(0xFFF8E9E9),
                  onTap: () => onTopic('History'),
                ),
                Category(
                  icon: Icons.calculate_outlined,
                  label: 'Math',
                  tint: const Color(0xFFF5DEDF),
                  onTap: () => onTopic('Mathematics'),
                ),
                Category(
                  icon: Icons.menu_book_rounded,
                  label: 'Language',
                  tint: const Color(0xFFF8E9E9),
                  onTap: () => onTopic('English'),
                ),
            ],
          ),
          const SizedBox(height: 20),
          SectionTitle(
            title: 'Popular quizzes',
            action: 'See all',
            onTap: onExplore,
          ),
          const SizedBox(height: 10),
          Column(
            children: [
                _PopularQuizCard(
                  title: 'JavaScript',
                  detail: '10 questions  |  Beginner',
                  icon: Icons.code_rounded,
                  onTap: () => onTopic('JavaScript'),
                ),
                const SizedBox(height: 10),
                _PopularQuizCard(
                  title: 'The solar system',
                  detail: '10 questions  |  General',
                  icon: Icons.public_rounded,
                  onTap: () => onTopic('The solar system'),
                ),
                const SizedBox(height: 10),
                _PopularQuizCard(
                  title: 'World history',
                  detail: '10 questions  |  General',
                  icon: Icons.account_balance_outlined,
                  onTap: () => onTopic('World history'),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({
    required this.eyebrow,
    required this.title,
    required this.detail,
    required this.buttonLabel,
    required this.icon,
    required this.onTap,
  });

  final String eyebrow;
  final String title;
  final String detail;
  final String buttonLabel;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => SizedBox(
        width: 278,
        child: Material(
          color: ink,
          borderRadius: BorderRadius.circular(19),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(19),
            child: Ink(
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [ink, Color(0xFF70434A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(19),
              ),
              child: Stack(
                children: [
                  Positioned(
                    right: 14,
                    top: 22,
                    child: Icon(
                      icon,
                      size: 76,
                      color: Colors.white.withValues(alpha: .12),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          eyebrow,
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 9,
                            letterSpacing: 1,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          title,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            height: 1.08,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          detail,
                          style: const TextStyle(color: Colors.white70, fontSize: 10),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            buttonLabel,
                            style: const TextStyle(
                              color: violet,
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}

class _PopularQuizCard extends StatelessWidget {
  const _PopularQuizCard({
    required this.title,
    required this.detail,
    required this.icon,
    required this.onTap,
  });

  final String title;
  final String detail;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => SizedBox(
        width: double.infinity,
        child: Material(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(16),
            child: Container(
              padding: const EdgeInsets.all(11),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFECE6E5)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 42,
                    height: 42,
                  decoration: BoxDecoration(
                      color: const Color(0xFFF5DEDF),
                      borderRadius: BorderRadius.circular(13),
                    ),
                    child: Icon(icon, color: violet, size: 21),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: ink,
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          detail,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: muted, fontSize: 9),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}
