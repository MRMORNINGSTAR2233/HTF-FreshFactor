import 'package:flutter/material.dart';
import '../services/api_service.dart';

class HealthTrackerPage extends StatefulWidget {
  const HealthTrackerPage({super.key});

  @override
  _HealthTrackerPageState createState() => _HealthTrackerPageState();
}

class _HealthTrackerPageState extends State<HealthTrackerPage> {
  final TextEditingController _foodController = TextEditingController();
  List<String> foods = [];
  String healthInsights = '';

  void trackFood(String food) {
    setState(() {
      foods.add(food);
    });
  }

  void analyzeHealth() async {
    try {
      final analysis = await ApiService.analyzeHealth(foods);
      setState(() {
        healthInsights = analysis['insights'];
      });
    } catch (e) {
      setState(() {
        healthInsights = 'Error analyzing health data';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Health Tracker')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: foods.length,
              itemBuilder: (context, index) => ListTile(title: Text(foods[index])),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _foodController,
                    decoration: const InputDecoration(hintText: 'Enter food item'),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: () {
                    trackFood(_foodController.text);
                    _foodController.clear();
                  },
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: analyzeHealth,
            child: const Text('Analyze Health'),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              healthInsights,
              style: const TextStyle(fontSize: 16, color: Colors.green),
            ),
          ),
        ],
      ),
    );
  }
}
