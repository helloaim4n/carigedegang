import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from "react-native";
import { login, emailVerification } from "../services/Auth";
import { useNavigation } from "@react-navigation/native";
import Loader from "../services/LoadingIndicator";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    setLoading(true);
    
    try {
      const user = await login(email, password);
      if (user) {
        if (!user.emailVerified) {
          setShowEmailMessage(true);
          await emailVerification();
        //   await logout();
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Invalid email or password.");
      } else if (error.code === "auth/too-many-request") {
        alert("Too many requests. Try again later.");
      } else {
        alert("Sign-in error: " + error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Text>Login</Text>
        { showEmailMessage ? ( <Text style={styles.errorMessage}>Please verify your email address. Check your email for verification link.</Text> ) : ( <></> ) }
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
        { loading ? ( <Loader /> ) : ( <TouchableOpacity style={styles.button} onPress={handleLogin}><Text>Login</Text></TouchableOpacity> )}

        <TouchableOpacity onPress={handleSignup}><Text>Don't have an account? Register here.</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  errorMessage: {
    color: "red",
    paddingVertical: 5,
  },
});

export default LoginScreen;