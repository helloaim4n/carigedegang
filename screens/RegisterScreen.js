import { StyleSheet, KeyboardAvoidingView, ScrollView, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signup } from "../services/Auth";
import { useNavigation } from '@react-navigation/native';
import Loader from "../services/LoadingIndicator";

const RegisterScreen = () => {
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("123456");
    const [firstname, setFirstname] = useState("Test");
    const [lastname, setLastname] = useState("User");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        setLoading(true);

        try {
            const user = await signup(email, password, firstname, lastname);

            if (user) {
                // navigation.navigate("Login");
            }
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use. Please choose different email.");
            } else if (error.code === "auth/weak-password") {
                alert("Weak password. Please choose stronger password.");
            } else {
                alert("Signup error: " + error.message);
            }
        }
    };

    const handleLogin = async () => {
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput style={styles.input} placeholder="Firstname"  autoCapitalize="none" value={firstname} onChangeText={setFirstname} />
          <TextInput style={styles.input} placeholder="Lastname"  autoCapitalize="none" value={lastname} onChangeText={setLastname} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
          { loading ? ( <Loader /> ) : ( <TouchableOpacity style={styles.button} onPress={handleSignup}><Text style={styles.buttonText}>Signup</Text></TouchableOpacity> )}
          <TouchableOpacity style={styles.link} onPress={handleLogin}>
            <Text>Already have an account? Login here.</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      link: {
        marginTop: 20,
        color: "blue",
        textDecorationLine: "underline",
      },
    });
    
    export default RegisterScreen;