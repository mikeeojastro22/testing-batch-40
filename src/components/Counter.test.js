import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increment button works", () => {
    // renders the Counter component
    render(<Counter />);

    // getting the counter
    // binded data-testid="counter"
    const counterValue = screen.getByTestId("counter");

    // getting the increment button
    const incrementButton = screen.getByText("+");

    // actual test
    // imitate the clicking of the increment button
    // userEvent.click - used to "click" the button
    userEvent.click(incrementButton);

    // assert
    // we need to typecast the textContent of counterValue
    const counterText = Number(counterValue.textContent);
    expect(counterText).toBeGreaterThan(0);
});

test("decrement button works", () => {
    render(<Counter />);
    
    // getting the value of counter
    const counterValue = screen.getByTestId("counter");

    // imitate the clicking of the decrement button
    // getting the element by data-testid
    const decrementButton = screen.getByTestId("decrement");
    // event to click the button
    userEvent.click(decrementButton);

    // actual test
    // Typecasting the retrieved value to integer from the element
    const counterText = Number(counterValue.textContent);
    // assert if number is -1
    expect(counterText).toBeLessThan(0);
});