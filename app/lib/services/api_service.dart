import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Fetch product details based on barcode
  static Future<Map<String, dynamic>> fetchProductDetails(String barcode) async {
    final response = await http.get(Uri.parse('https://localhost:5001/products/$barcode'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load product');
    }
  }

  // Fetch recipe suggestions based on user query
  static Future<String> fetchRecipeSuggestion(String query) async {
    final response = await http.post(
      Uri.parse('https://localhost:5001/recipe'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'query': query}),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['recipe_suggestion'];
    } else {
      throw Exception('Failed to fetch recipe');
    }
  }

  // Analyze health based on consumed foods
  static Future<Map<String, dynamic>> analyzeHealth(List<String> foods) async {
    final response = await http.post(
      Uri.parse('https:///localhost:5001/health/analyze'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'foods': foods}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to analyze health');
    }
  }
}
