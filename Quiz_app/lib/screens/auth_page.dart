import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../core/quiz_api.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({super.key, required this.onSuccess, this.initialIsLogin = true});
  final Future<void> Function(Map<String, dynamic>) onSuccess;
  final bool initialIsLogin;
  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  bool isLogin = true;
  bool showPassword = false;
  bool loading = false;
  String? error;
  String? success;
  final name = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();

  @override
  void initState() {
    super.initState();
    isLogin = widget.initialIsLogin;
  }

  Future<void> _submit() async {
    if (email.text.trim().isEmpty ||
        password.text.isEmpty ||
        (!isLogin && name.text.trim().isEmpty)) {
      setState(() => error = 'Please complete all required fields.');
      return;
    }
    setState(() {
      loading = true;
      error = null;
      success = null;
    });
    try {
      if (isLogin) {
        final data = await QuizApi.post('/api/auth/login', {
          'email': email.text.trim(),
          'password': password.text,
        });
        final user = Map<String, dynamic>.from(data['user'] as Map);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', data['token'].toString());
        await prefs.setString('userId', user['_id'].toString());
        await prefs.setString(
          'userName',
          user['name']?.toString() ?? 'Learner',
        );
        await widget.onSuccess(user);
        if (mounted) Navigator.of(context).pop();
      } else {
        await QuizApi.post('/api/auth/signup', {
          'name': name.text.trim(),
          'email': email.text.trim(),
          'password': password.text,
        });
        if (mounted)
          setState(() {
            isLogin = true;
            success = 'Account created. Sign in to continue.';
          });
      }
    } catch (e) {
      if (mounted)
        setState(() => error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  void dispose() {
    name.dispose();
    email.dispose();
    password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: const Icon(Icons.arrow_back_rounded),
      ),
    ),
    body: SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 12, 24, 28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: violet.withValues(alpha: .12),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(Icons.auto_awesome_rounded, color: violet),
            ),
            const SizedBox(height: 23),
            Text(
              isLogin ? 'Welcome back' : 'Create your account',
              style: const TextStyle(
                color: ink,
                fontSize: 28,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 7),
            Text(
              isLogin
                  ? 'Sign in to pick up where you left off.'
                  : 'Join QuizApp and start learning your way.',
              style: const TextStyle(color: muted, fontSize: 14),
            ),
            const SizedBox(height: 28),
            if (!isLogin) ...[
              AuthField(
                label: 'Name',
                hint: 'Your name',
                icon: Icons.person_outline_rounded,
                controller: name,
              ),
              const SizedBox(height: 15),
            ],
            AuthField(
              label: 'Email',
              hint: 'you@example.com',
              icon: Icons.mail_outline_rounded,
              controller: email,
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 15),
            AuthField(
              label: 'Password',
              hint: 'At least 6 characters',
              icon: Icons.lock_outline_rounded,
              controller: password,
              obscure: !showPassword,
              suffix: IconButton(
                onPressed: () => setState(() => showPassword = !showPassword),
                icon: Icon(
                  showPassword
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  color: muted,
                  size: 20,
                ),
              ),
            ),
            if (isLogin)
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {},
                  child: const Text('Forgot password?'),
                ),
              ),
            const SizedBox(height: 15),
            if (error != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Text(
                  error!,
                  style: const TextStyle(color: Color(0xFFB42318)),
                ),
              ),
            if (success != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Text(
                  success!,
                  style: const TextStyle(color: Color(0xFF16845B)),
                ),
              ),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton(
                onPressed: loading ? null : _submit,
                style: FilledButton.styleFrom(
                  backgroundColor: violet,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
                child: loading
                    ? const SizedBox(
                        width: 21,
                        height: 21,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : Text(
                        isLogin ? 'Sign in' : 'Create account',
                        style: const TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 15,
                        ),
                      ),
              ),
            ),
            const SizedBox(height: 18),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  isLogin ? 'New to QuizApp? ' : 'Already have an account? ',
                  style: const TextStyle(color: muted),
                ),
                TextButton(
                  onPressed: () => setState(() => isLogin = !isLogin),
                  child: Text(
                    isLogin ? 'Create account' : 'Sign in',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}
