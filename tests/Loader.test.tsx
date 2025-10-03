import Loader from "@/components/Loader";
import { render } from "@testing-library/react-native";
import React from "react";

describe("Loader", () => {
  it("se muestra cuando visible=true", () => {
    const { getByText } = render(
      <Loader visible message="Cargando Pokemons..." />
    );
    expect(getByText("Cargando Pokemons...")).toBeTruthy();
  });

  it("no se renderiza cuando visible=false", () => {
    const { queryByText } = render(
      <Loader visible={false} message="Cargando..." />
    );
    expect(queryByText("Cargando...")).toBeNull();
  });
});