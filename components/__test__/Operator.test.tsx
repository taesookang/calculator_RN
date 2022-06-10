import { render } from "@testing-library/react-native";
import Operator from "../Operator";


it("renders multiplying button", () => {
  const { getByTestId } = render(
    <Operator value={"*"} isPressed={true} theme="dark" />
  );
  expect(getByTestId("icon_multiply")).toBeTruthy();
});

it("renders dot button", () => {
  const { getByTestId } = render(
    <Operator value={"."} isPressed={false} theme="dark" />
  );
  expect(getByTestId("icon_dot")).toBeTruthy();

});

it("renders no button when value prop equals null", () => {
  const { queryByTestId } = render(
    <Operator value={null} isPressed={false} theme="dark" />
  );
  expect(queryByTestId(/icon/)).toBeNull()
});
