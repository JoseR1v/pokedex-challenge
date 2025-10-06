import PokemonCard from "@/components/pokemon/PokemonCard";
import { render } from "@testing-library/react-native";

describe("PokemonCard", () => {
  it("muestra nombre capitalizado y tipos", () => {
    const { getByText } = render(
      <PokemonCard
        name="bulbasaur"
        types={["grass", "poison"]}
        sprites={{
          officialArtwork:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          frontDefault:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }}
      />
    );

    expect(getByText("Bulbasaur")).toBeTruthy();
    expect(getByText("Grass")).toBeTruthy();
    expect(getByText("Poison")).toBeTruthy();
  });

  it("usa el PNG oficial cuando está disponible", () => {
    const { getByLabelText } = render(
      <PokemonCard
        name="bulbasaur"
        types={["grass", "poison"]}
        sprites={{
          officialArtwork:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        }}
      />
    );
    // se consulta por accessibilityLabel `${name} image`
    expect(getByLabelText("bulbasaur image")).toBeTruthy();
  });

  it("cae a SVG cuando no hay PNGs", () => {
    const { getByTestId } = render(
      <PokemonCard
        name="oddish"
        types={["grass"]}
        sprites={{
          dreamWorld:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/43.svg",
        }}
      />
    );
    expect(getByTestId("mock-svg")).toBeTruthy();
  });
});