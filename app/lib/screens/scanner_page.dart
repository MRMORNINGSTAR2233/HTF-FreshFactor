import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'product_details_page.dart';

class ScannerPage extends StatelessWidget {
  const ScannerPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan Barcode')),
      body: Center(
        child: MobileScanner(
          onDetect: (barcode, args) {
            if (barcode.rawValue != null) {
              final String scannedBarcode = barcode.rawValue!;
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProductDetailsPage(barcode: scannedBarcode),
                ),
              );
            }
          },
        ),
      ),
    );
  }
}
