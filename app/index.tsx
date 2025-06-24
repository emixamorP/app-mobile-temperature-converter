import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [conversionType, setConversionType] = useState('celsiusToFahrenheit');

  // Fonction de conversion Celsius vers Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  // Fonction de conversion Fahrenheit vers Celsius
  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5/9;
  };

  // Fonction principale de conversion
  const convertTemperature = () => {
    if (inputValue === '') {
      Alert.alert('Erreur', 'Veuillez entrer une valeur');
      return;
    }

    const numValue = parseFloat(inputValue.replace(',', '.'));
    
    if (isNaN(numValue)) {
      Alert.alert('Erreur', 'Veuillez entrer un nombre valide');
      return;
    }

    let convertedValue;
    let resultText;

    if (conversionType === 'celsiusToFahrenheit') {
      convertedValue = celsiusToFahrenheit(numValue);
      resultText = `${numValue}°C = ${convertedValue.toFixed(2)}°F`;
    } else {
      convertedValue = fahrenheitToCelsius(numValue);
      resultText = `${numValue}°F = ${convertedValue.toFixed(2)}°C`;
    }

    setResult(resultText);
  };

  // Fonction pour changer le type de conversion
  const toggleConversionType = () => {
    setConversionType(
      conversionType === 'celsiusToFahrenheit' 
        ? 'fahrenheitToCelsius' 
        : 'celsiusToFahrenheit'
    );
    setInputValue('');
    setResult('');
  };

  // Fonction pour effacer les valeurs
  const clearValues = () => {
    setInputValue('');
    setResult('');
  };

  // Fonction pour ajouter des valeurs prédéfinies
  const addPresetValue = (value) => {
    setInputValue(value.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* En-tête avec titre */}
          <View style={styles.header}>
            <Text style={styles.title}>🌡️ Convertisseur</Text>
            <Text style={styles.subtitle}>de Température</Text>
          </View>
          
          {/* Indicateur du type de conversion */}
          <View style={styles.conversionIndicator}>
            <Text style={styles.conversionText}>
              {conversionType === 'celsiusToFahrenheit' 
                ? '🌡️ Celsius → Fahrenheit 🌡️' 
                : '🌡️ Fahrenheit → Celsius 🌡️'}
            </Text>
          </View>

          {/* Zone de saisie */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Température en {conversionType === 'celsiusToFahrenheit' ? 'Celsius (°C)' : 'Fahrenheit (°F)'} :
            </Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={conversionType === 'celsiusToFahrenheit' ? 'Ex: 25' : 'Ex: 77'}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={convertTemperature}
              placeholderTextColor="#95a5a6"
            />
          </View>

          {/* Boutons de valeurs prédéfinies */}
          <View style={styles.presetContainer}>
            <Text style={styles.presetLabel}>Valeurs courantes :</Text>
            <View style={styles.presetButtons}>
              {conversionType === 'celsiusToFahrenheit' ? (
                <>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(0)}>
                    <Text style={styles.presetButtonText}>0°C</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(20)}>
                    <Text style={styles.presetButtonText}>20°C</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(37)}>
                    <Text style={styles.presetButtonText}>37°C</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(100)}>
                    <Text style={styles.presetButtonText}>100°C</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(32)}>
                    <Text style={styles.presetButtonText}>32°F</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(68)}>
                    <Text style={styles.presetButtonText}>68°F</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(98.6)}>
                    <Text style={styles.presetButtonText}>98.6°F</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetButton} onPress={() => addPresetValue(212)}>
                    <Text style={styles.presetButtonText}>212°F</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Boutons d'action principaux */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.convertButton} 
              onPress={convertTemperature}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>🔄 Convertir</Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtons}>
              <TouchableOpacity 
                style={styles.toggleButton} 
                onPress={toggleConversionType}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  🔄 {conversionType === 'celsiusToFahrenheit' ? 'F→C' : 'C→F'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={clearValues}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>🗑️ Effacer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Affichage du résultat */}
          {result !== '' && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>✅ Résultat :</Text>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          )}

          {/* Informations supplémentaires */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>📐 Formules de conversion :</Text>
            <Text style={styles.infoText}>°F = (°C × 9/5) + 32</Text>
            <Text style={styles.infoText}>°C = (°F - 32) × 5/9</Text>
            <Text style={styles.infoFooter}>Développé avec Expo & React Native</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#bdc3c7',
    textAlign: 'center',
    marginTop: 5,
  },
  conversionIndicator: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  conversionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ecf0f1',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#34495e',
    borderRadius: 12,
    padding: 18,
    fontSize: 20,
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    textAlign: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  presetContainer: {
    marginBottom: 25,
  },
  presetLabel: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 10,
    textAlign: 'center',
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  presetButton: {
    backgroundColor: '#7f8c8d',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
  },
  presetButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  convertButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  clearButton: {
    backgroundColor: '#95a5a6',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#27ae60',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resultLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 12,
    marginTop: 'auto',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  infoFooter: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});