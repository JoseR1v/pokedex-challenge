import Input from "@/components/ui/Input";
import { fireEvent, render } from "@testing-library/react-native";

describe("Input", () => {
  it("renderiza label y helper", () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Nombre" helperText="Requerido" placeholder="Tu nombre" />
    );
    expect(getByText("Nombre")).toBeTruthy();
    expect(getByText("Requerido")).toBeTruthy();
    expect(getByPlaceholderText("Tu nombre")).toBeTruthy();
  });

  it("muestra errorText", () => {
    const { getByText } = render(<Input errorText="Campo inválido" />);
    expect(getByText("Campo inválido")).toBeTruthy();
  });

  it("togglea secureTextEntry cuando canToggleSecureText", () => {
    const { getByText } = render(
      <Input label="Password" placeholder="••••" secureTextEntry canToggleSecureText />
    );
    const toggle = getByText("Mostrar");
    fireEvent.press(toggle);
    fireEvent.press(getByText("Ocultar"));
  });
});