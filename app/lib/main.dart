import 'package:flutter/material.dart';
import 'screens/scanner_page.dart';
import 'screens/recipe_generator_page.dart';
import 'screens/health_tracker_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FreshFactor',
      theme: ThemeData(primarySwatch: Colors.green),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('FreshFactor')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              child: const Text('Scan Product'),
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ScannerPage())),
            ),
            ElevatedButton(
              child: const Text('Recipe Generator'),
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RecipeGeneratorPage())),
            ),
            ElevatedButton(
              child: const Text('Health Tracker'),
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => HealthTrackerPage())),
            ),
          ],
        ),
      ),
    );
  }
}
