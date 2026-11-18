import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../theme/app_theme.dart';

class QuizApi {
  static Uri uri(String path) => Uri.parse('$apiBaseUrl$path');

  static Future<String?> _token() async =>
      (await SharedPreferences.getInstance()).getString('token');

  static Future<Map<String, dynamic>> post(
    String path,
    Map<String, dynamic> body,
  ) async {
    final response = await http
        .post(
          uri(path),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(body),
        )
        .timeout(const Duration(seconds: 45));
    final data = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(
        data['message'] ??
            data['error'] ??
            'Request failed (${response.statusCode})',
      );
    }
    return data;
  }

  static Future<dynamic> get(String path) async {
    final token = await _token();
    final headers = <String, String>{'Content-Type': 'application/json'};
    if (token != null) headers['Authorization'] = 'Bearer $token';
    final response = await http
        .get(uri(path), headers: headers)
        .timeout(const Duration(seconds: 30));
    final data = response.body.isEmpty ? null : jsonDecode(response.body);
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(
        data is Map
            ? (data['message'] ?? data['error'] ?? 'Request failed')
            : 'Request failed',
      );
    }
    return data;
  }

  static Future<Map<String, dynamic>> put(
    String path,
    Map<String, dynamic> body,
  ) async {
    final token = await _token();
    final headers = <String, String>{'Content-Type': 'application/json'};
    if (token != null) headers['Authorization'] = 'Bearer $token';
    final response = await http
        .put(uri(path), headers: headers, body: jsonEncode(body))
        .timeout(const Duration(seconds: 30));
    final data = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(
        data['message'] ??
            data['error'] ??
            'Request failed (${response.statusCode})',
      );
    }
    return data;
  }
}
