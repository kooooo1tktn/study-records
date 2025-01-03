import TodoComponent from "../App";
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", async () => {
    // testId(title)を指定して取得
    render(<TodoComponent />);
    // 非同期処理が完了するまで待機
    const title = await waitFor(() => screen.getByTestId("title"));
    // タイトルが "Hello Jest" であることを確認します
    expect(title).toHaveTextContent("Hello Jest");
  });

  it("削除ボタンを押すと学習記録が削除され、数が1つ減っていること", async () => {
    render(<TodoComponent />);
    // 非同期処理が完了するまで待機
    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

    // 学習内容を入力
    fireEvent.change(screen.getByLabelText("学習内容"), { target: { value: "Reactの勉強" } });
    // 学習時間を入力
    fireEvent.change(screen.getByLabelText("学習時間時間"), { target: { value: 1 } });
    // 登録ボタンをクリック
    fireEvent.click(screen.getByText("登録"));
    // 新しく追加された学習記録が画面に表示されていることを確認
    const newRecord = await waitFor(() => screen.findByText("Reactの勉強1時間"));
    expect(newRecord).toBeInTheDocument();

    // 削除ボタンをクリック
    const deleteButton = screen.getByText("Reactの勉強1時間").closest('li').querySelector('button');
    fireEvent.click(deleteButton);

    // 学習記録が削除されていること確認
    await waitFor(() => expect(screen.queryByText("Rreactの勉強1時間")).not.toBeInTheDocument());
  });

    it("フォームに入力をしないで登録を押すとエラーが表示されること", async () => {
      render(<TodoComponent />);
      // 非同期処理が完了するまで待機
      await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

    // フォームに入力をしないで登録ボタンをクリック
    fireEvent.click(screen.getByText("登録"));

    // エラーメッセージが表示されていることを確認
    const errorMessage = await waitFor(() => screen.getByText("入力されていない項目があります"));
    expect(errorMessage).toBeInTheDocument();
  });
});
