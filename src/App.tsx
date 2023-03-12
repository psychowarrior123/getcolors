import React from "react";
import { hot } from "react-hot-loader/root";
import { TestComponent } from "./components/TestComponent";
import { AppLayout } from "./features/layout/AppLayout";

export const App = hot(_App);

export function _App(): JSX.Element | null {
  return (
    <AppLayout>
      <TestComponent />
    </AppLayout>
  );
}
