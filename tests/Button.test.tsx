import Button from "@/components/ui/Button";
import { fireEvent, render } from "@testing-library/react-native";

describe("Button", () => {
  it("renderiza label y dispara onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText("Tap"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("no dispara onPress si disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>Nope</Button>
    );
    fireEvent.press(getByText("Nope"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("muestra loader cuando loading", () => {
    const { queryByText } = render(
      <Button loading>Guardando</Button>
    );
    expect(queryByText("Guardando")).toBeNull();
  });
});