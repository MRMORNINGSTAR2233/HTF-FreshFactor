import 'package:flutter/material.dart';
import '../services/api_service.dart';

class RecipeGeneratorPage extends StatefulWidget {
  const RecipeGeneratorPage({super.key});

  @override
  _RecipeGeneratorPageState createState() => _RecipeGeneratorPageState();
}

class _RecipeGeneratorPageState extends State<RecipeGeneratorPage> {
  final TextEditingController _controller = TextEditingController();
  List<String> messages = [];

  void fetchRecipe(String query) async {
    setState(() {
      messages.add('You: $query');
    });

    try {
      final recipe = await ApiService.fetchRecipeSuggestion(query);
      setState(() {
        messages.add('RecipeBot: $recipe');
      });
    } catch (e) {
      setState(() {
        messages.add('RecipeBot: Error fetching recipe');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Recipe Generator')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) => ListTile(title: Text(messages[index])),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(child: TextField(controller: _controller)),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () {
                    fetchRecipe(_controller.text);
                    _controller.clear();
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
