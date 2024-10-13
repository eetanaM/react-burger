import { checkResponse, checkSuccess } from "../../utils/api";

describe("checkResponse api function tests", () => {
  it("should be success", () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: function () {
        return { result: "OK" };
      },
    };

    // Act
    const result = checkResponse(mockResponse);

    // Assert
    expect(result).toEqual({ result: "OK" });
  });

  it("should be rejected with 'Ошибка ${res.status}' message", async () => {
    // Arrange
    const mockResponse = {
      ok: false,
      status: 400,
    };

    // Act
    const result = checkResponse(mockResponse);

    // Assert
    await expect(result).rejects.toBe("Ошибка 400");
  });

  it("should be rejected with 'jwt expired' message", async () => {
    // Arrange
    const mockResponse = {
      ok: false,
      status: 403,
    };

    // Act
    const result = checkResponse(mockResponse);

    // Assert
    await expect(result).rejects.toBe("jwt expired");
  });
});

describe("checkSuccess api function tests", () => {
  it("should be success", () => {
    // Arrange
    const mockResponse = {
      success: true,
      result: "OK",
    };

    // Act
    const result = checkSuccess(mockResponse);

    // Assert
    expect(result).toEqual({ result: "OK", success: true });
  });

  it("should be rejected with 'Не получен успешный ответ' message", async () => {
    // Arrange
    const mockResponse = {
      success: false,
      result: "OK",
    };

    // Act
    const result = checkSuccess(mockResponse);

    // Assert
    await expect(result).rejects.toBe("Не получен успешный ответ");
  });
});

// ↓↓↓ Пример тестирования отдельных api функций, которые по-моему не имеют особого смысла, т.к. вся их суть с мокированным
// fetch сводится, за редким исключением, к проверке отработки функций checkResponse и checkSuccess
/* describe("registerUser api function tests", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        result: "OK",
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be successfully", async () => {
    const results = await registerUser("email", "password", "username");

    expect(results).toEqual({ result: "OK", success: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should be failed", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: "OK", success: true }),
        status: 400,
      })
    );

    await expect(registerUser("email", "password", "username")).rejects.toBe(
      "Ошибка 400"
    );
  });
}); */
