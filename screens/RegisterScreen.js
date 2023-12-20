import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { TextInput, Button, Snackbar } from "react-native-paper";
import React, { useState } from 'react';
import { signup } from "../services/Auth";
import { useNavigation } from '@react-navigation/native';
import Loader from "../services/LoadingIndicator";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
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
            setSnackbarVisible(true);
        }
    };

    const handleLogin = async () => {

        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput style={{width: "100%"}} placeholder="First name"  autoCapitalize="none" value={firstname} onChangeText={setFirstname} />
          <TextInput style={{width: "100%"}} placeholder="Last name"  autoCapitalize="none" value={lastname} onChangeText={setLastname} />
          <TextInput style={{width: "100%"}} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={{width: "100%"}} placeholder="Password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
          <Button style={{ marginTop: 20 }} mode="contained" onPress={handleSignup} loading={loading}>
            Sign up
          </Button>
          <Button onPress={handleLogin}>
            Already have an account? Login here.
          </Button>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
          >
            Invalid email or password.
          </Snackbar>
        </KeyboardAvoidingView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
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