import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import api from "./services/api";
//convert?q=USD_BRL&compact=ultra&apiKey=7ec9e361f8e2e82d7285
class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaB_valor: 0,
      valorConvertido: 0,
    };
    this.converter = this.converter.bind(this);
  }

  async converter() {
    let de_para = this.state.moedaA + "_" + this.state.moedaB;
    const response = await api.get(
      `convert?q=${de_para}&compact=ultra&apiKey=7c5ef455b88d735bc6ad`
    );
    let cotacao = response.data[de_para];
    let resultado = cotacao * parseFloat(this.state.moedaB_valor).toFixed(2);
    this.setState({
      valorConvertido: "R$" + resultado.toFixed(1),
    });
    Keyboard.dismiss();
  }
  render() {
    const { moedaA, moedaB } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textoApp}>
          <Text style={styles.tituloApptext}>Conversor de Moedas</Text>
        </View>
        <Text style={styles.titulo}>
          {moedaA} para {moedaB}
        </Text>
        <TextInput
          placeholder="Valor a Ser Convertio"
          style={styles.areaInput}
          onChangeText={(moedaB_valor) => this.setState({ moedaB_valor })}
          keyboardType={"numeric"}
        />
        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>
        <Text style={styles.valorConvertido}>
          {this.state.valorConvertido === 0 ? "" : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  tituloApptext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  areaInput: {
    width: 280,
    height: 45,
    backgroundColor: "#ccc",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
    color: "#000",
    borderRadius: 5,
  },
  botaoArea: {
    width: 150,
    height: 45,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
});

export default Conversor;
