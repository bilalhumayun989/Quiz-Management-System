import 'package:flutter/material.dart';

import '../core/quiz_api.dart';
import '../theme/app_theme.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({
    super.key,
    required this.signedIn,
    required this.userName,
    required this.profile,
    required this.onProfileUpdated,
    required this.onAuth,
    required this.onSignOut,
  });

  final bool signedIn;
  final String? userName;
  final Map<String, dynamic>? profile;
  final Future<void> Function() onProfileUpdated;
  final VoidCallback onAuth;
  final Future<void> Function() onSignOut;

  String _value(String key) {
    final value = profile?[key]?.toString().trim() ?? '';
    return value.isEmpty ? 'Not added' : value;
  }

  @override
  Widget build(BuildContext context) {
    final profileName = profile?['name']?.toString().trim() ?? '';
    final fallbackName = userName?.trim() ?? '';
    final name = profileName.isNotEmpty
        ? profileName
        : (fallbackName.isNotEmpty ? fallbackName : 'Learner');
    final profileEmail = profile?['email']?.toString().trim() ?? '';
    final email = profileEmail.isNotEmpty
        ? profileEmail
        : 'Your quiz history and progress stay with your account.';
    final initial = name[0].toUpperCase();

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.fromLTRB(22, 18, 22, 30),
        children: [
          const Text(
            'Profile',
            style: TextStyle(color: ink, fontSize: 28, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 5),
          const Text(
            'Your account and learning details.',
            style: TextStyle(color: muted, fontSize: 14),
          ),
          const SizedBox(height: 22),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFD8757E), Color(0xFFBC5867)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: violet.withValues(alpha: .2),
                  blurRadius: 20,
                  offset: const Offset(0, 9),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 62,
                  height: 62,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: .2),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withValues(alpha: .45)),
                  ),
                  child: Text(
                    signedIn ? initial : '?',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 27,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        signedIn ? name : 'Your learning profile',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 19,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        signedIn ? email : 'Sign in to save quizzes and track progress.',
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: .88),
                          fontSize: 12,
                          height: 1.35,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 26),
          const _SectionLabel('ACCOUNT DETAILS'),
          const SizedBox(height: 10),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFECE6E5)),
            ),
            child: signedIn
                ? Column(
                    children: [
                      _ProfileDetail(
                        icon: Icons.alternate_email_rounded,
                        label: 'Email',
                        value: email,
                      ),
                      const Divider(height: 1, indent: 58, endIndent: 16),
                      _ProfileDetail(
                        icon: Icons.phone_outlined,
                        label: 'Phone',
                        value: _value('phone'),
                      ),
                      const Divider(height: 1, indent: 58, endIndent: 16),
                      _ProfileDetail(
                        icon: Icons.location_on_outlined,
                        label: 'Location',
                        value: _value('location'),
                      ),
                    ],
                  )
                : Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Keep your progress in one place',
                          style: TextStyle(
                            color: ink,
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 5),
                        const Text(
                          'Sign in to save quiz results and pick up where you left off.',
                          style: TextStyle(color: muted, height: 1.4),
                        ),
                        const SizedBox(height: 14),
                        SizedBox(
                          width: double.infinity,
                          child: FilledButton(
                            onPressed: onAuth,
                            child: const Text('Sign in or create account'),
                          ),
                        ),
                      ],
                    ),
                  ),
          ),
          if (signedIn) ...[
            const SizedBox(height: 26),
            const _SectionLabel('SETTINGS'),
            const SizedBox(height: 10),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFECE6E5)),
              ),
              child: Column(
                children: [
                  _ProfileAction(
                    icon: Icons.edit_outlined,
                    title: 'Edit profile',
                    subtitle: 'Update your personal details',
                    onTap: () => showDialog<void>(
                      context: context,
                      builder: (_) => _EditProfileDialog(
                        profile: profile ?? {},
                        onSaved: onProfileUpdated,
                      ),
                    ),
                  ),
                  const Divider(height: 1, indent: 58, endIndent: 16),
                  _ProfileAction(
                    icon: Icons.logout_rounded,
                    title: 'Sign out',
                    subtitle: 'Sign out of this account',
                    onTap: onSignOut,
                    destructive: true,
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _ProfileDetail extends StatelessWidget {
  const _ProfileDetail({
    required this.icon,
    required this.label,
    required this.value,
  });

  final IconData icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
        child: Row(
          children: [
            Icon(icon, color: violet, size: 20),
            const SizedBox(width: 13),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: const TextStyle(color: muted, fontSize: 11)),
                  const SizedBox(height: 3),
                  Text(
                    value,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: ink,
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel(this.title);
  final String title;

  @override
  Widget build(BuildContext context) => Text(
        title,
        style: const TextStyle(
          color: muted,
          fontSize: 11,
          fontWeight: FontWeight.w800,
          letterSpacing: 1.1,
        ),
      );
}

class _ProfileAction extends StatelessWidget {
  const _ProfileAction({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
    this.destructive = false,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final bool destructive;

  @override
  Widget build(BuildContext context) => ListTile(
        onTap: onTap,
        leading: Icon(
          icon,
          color: destructive ? const Color(0xFFB85460) : violet,
        ),
        title: Text(
          title,
          style: TextStyle(
            color: destructive ? const Color(0xFFB85460) : ink,
            fontWeight: FontWeight.w700,
            fontSize: 14,
          ),
        ),
        subtitle: Text(subtitle, style: const TextStyle(color: muted, fontSize: 12)),
        trailing: const Icon(Icons.chevron_right_rounded, color: muted),
      );
}

class _EditProfileDialog extends StatefulWidget {
  const _EditProfileDialog({required this.profile, required this.onSaved});

  final Map<String, dynamic> profile;
  final Future<void> Function() onSaved;

  @override
  State<_EditProfileDialog> createState() => _EditProfileDialogState();
}

class _EditProfileDialogState extends State<_EditProfileDialog> {
  late final name = TextEditingController(
    text: widget.profile['name']?.toString() ?? '',
  );
  late final phone = TextEditingController(
    text: widget.profile['phone']?.toString() ?? '',
  );
  late final location = TextEditingController(
    text: widget.profile['location']?.toString() ?? '',
  );

  bool saving = false;
  String? error;

  @override
  void dispose() {
    name.dispose();
    phone.dispose();
    location.dispose();
    super.dispose();
  }

  Future<void> save() async {
    setState(() {
      saving = true;
      error = null;
    });
    try {
      await QuizApi.put('/api/auth/profile', {
        'name': name.text.trim(),
        'phone': phone.text.trim(),
        'location': location.text.trim(),
      });
      await widget.onSaved();
      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) {
        setState(() => error = e.toString().replaceFirst('Exception: ', ''));
      }
    } finally {
      if (mounted) setState(() => saving = false);
    }
  }

  @override
  Widget build(BuildContext context) => AlertDialog(
        title: const Text('Edit profile'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: name,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: phone,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(labelText: 'Phone'),
              ),
              TextField(
                controller: location,
                decoration: const InputDecoration(labelText: 'Location'),
              ),
              if (error != null)
                Padding(
                  padding: const EdgeInsets.only(top: 10),
                  child: Text(
                    error!,
                    style: const TextStyle(color: Color(0xFFB42318)),
                  ),
                ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: saving ? null : () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: saving ? null : save,
            child: Text(saving ? 'Saving...' : 'Save'),
          ),
        ],
      );
}
