import 'package:flutter/material.dart';
import '../services/api_service.dart';

class ProductDetailsPage extends StatefulWidget {
  final String barcode;

  ProductDetailsPage({required this.barcode});

  @override
  _ProductDetailsPageState createState() => _ProductDetailsPageState();
}

class _ProductDetailsPageState extends State<ProductDetailsPage> {
  Map<String, dynamic>? productData;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  void fetchData() async {
    try {
      final data = await ApiService.fetchProductDetails(widget.barcode);
      setState(() {
        productData = data;
      });
    } catch (e) {
      print("Error fetching product data: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Product Details')),
      body: productData == null
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Image.network(productData!['image_url'] ?? 'https://via.placeholder.com/150'),
                const Text('Nutritional Facts:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Text('Calories: ${productData!['nutrients']['calories'] ?? 'N/A'}'),
                Text('Protein: ${productData!['nutrients']['protein'] ?? 'N/A'}'),
              ],
            ),
    );
  }
}
