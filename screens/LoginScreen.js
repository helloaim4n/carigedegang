import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { login, emailVerification } from "../services/Auth";
import { useNavigation } from "@react-navigation/native";
import Loader from "../services/LoadingIndicator";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const navigation = useNavigation();

  const handleSignup = () => {
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
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false} style={styles.container}>
      <Image source={require("../assets/loginPhoto.png")} style={{ width: "100%", height: 200, marginBottom: 20 }} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ width: "100%" }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{ width: "100%" }}
      />
      <Button style={{ marginTop: 20 }} mode="contained" onPress={handleLogin} loading={loading}>
        Login
      </Button>
      <Button  onPress={handleSignup}>Don't have an account? Register here.</Button>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
});

export default LoginScreen;