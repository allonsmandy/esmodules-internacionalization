import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;
import Person from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bicicleta,Carro 100000 2001-07-27 2002-10-20"
    );

    const expected = {
      from: "2001-07-27",
      to: "2002-10-20",
      vehicles: ["Bicicleta", "Carro"],
      kmTraveled: "100000",
      id: "1",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2001-07-27",
      to: "2002-10-20",
      vehicles: ["Bicicleta", "Carro"],
      kmTraveled: "100000",
      id: "1",
    }).formatted("pt-BR");

    const expected = {
      id: 1,
      vehicles: "Bicicleta e Carro",
      kmTraveled: "100.000 km",
      from: "27 de julho de 2001",
      to: "20 de outubro de 2002",
    };

    expect(person).to.be.deep.equal(expected);
  });
});
