import React, { forwardRef, useMemo, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type InputProps = Omit<TextInputProps, "style"> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  canToggleSecureText?: boolean;
};

const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    helperText,
    errorText,
    containerStyle,
    leftAccessory,
    rightAccessory,
    secureTextEntry,
    canToggleSecureText,
    editable = true,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [hide, setHide] = useState(!!secureTextEntry);

  const hasError = !!errorText;
  const showToggle = !!canToggleSecureText && !!secureTextEntry;

  const borderColor = useMemo(() => {
    if (!editable) return "rgba(0,0,0,0.08)";
    if (hasError) return "#A51B0B";
    if (focused) return "#FFFFFF";
    return "rgba(0,0,0,0.15)";
  }, [editable, hasError, focused]);

  const backgroundColor = editable ? "#FFFFFF4D" : "#F3F4F6";

  return (
    <View style={containerStyle}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.field, { borderColor, backgroundColor }]}>
        {!!leftAccessory && <View style={styles.accessoryLeft}>{leftAccessory}</View>}

        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor="rgba(0,0,0,0.4)"
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={hide}
          editable={editable}
          {...rest}
        />

        {!!rightAccessory && !showToggle && (
          <View style={styles.accessoryRight}>{rightAccessory}</View>
        )}

        {showToggle && (
          <Pressable
            onPress={() => setHide((v) => !v)}
            hitSlop={8}
            style={styles.accessoryRight}
          >
            <Text style={styles.toggleText}>{hide ? "Mostrar" : "Ocultar"}</Text>
          </Pressable>
        )}
      </View>

      {!!errorText ? (
        <Text style={styles.error}>{errorText}</Text>
      ) : !!helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "700",
    color: '#072AC8',
  },
  field: {
    minHeight: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000",
  },
  accessoryLeft: {
    marginRight: 8,
  },
  accessoryRight: {
    marginLeft: 8,
  },
  toggleText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 12,
  },
  helper: {
    marginTop: 6,
    fontSize: 12,
    color: "#F8F9FA",
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
  },
});