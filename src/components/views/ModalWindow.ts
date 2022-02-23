import {
  ILogin,
  IModalWindow,
  IModalWindowElement,
  IUser,
  IUserEmailOrPasswordIncorrect,
  IUserExistsError,
  UserLoginInformationType,
} from "../types/types";
import capitalizeFirstLetter from "../utils/utils";

export default class ModalWindow implements IModalWindow {
  container: HTMLElement;

  title: string;

  id: string;

  elements: IModalWindowElement[];

  action: string;

  saveCallback:
    | ((
        email: string,
        name: string,
        password: string
      ) => Promise<
        IUser | IUserExistsError | IUserEmailOrPasswordIncorrect | undefined
      >)
    | ((
        email: string,
        password: string
      ) => Promise<ILogin | UserLoginInformationType | unknown>);

  closeCallBack: () => void;

  constructor(
    container: HTMLElement,
    title: string,
    id: string,
    elements: IModalWindowElement[],
    action: string,
    saveCallBack:
      | ((
          email: string,
          name: string,
          password: string
        ) => Promise<
          IUser | IUserExistsError | IUserEmailOrPasswordIncorrect | undefined
        >)
      | ((
          email: string,
          password: string
        ) => Promise<ILogin | UserLoginInformationType | unknown>)
  ) {
    this.container = container;
    this.title = title;
    this.id = id;
    this.elements = elements;
    this.action = action;
    this.saveCallback = saveCallBack;
    this.closeCallBack = () => {
      const modalContainer: HTMLElement = document.getElementById(
        this.id
      ) as HTMLElement;
      this.elements.forEach((el: IModalWindowElement): void => {
        const input: HTMLInputElement = document.getElementById(
          `${el.name}-${this.id}`
        ) as HTMLInputElement;
        input.value = "";
        const errors: HTMLElement = document.getElementById(
          `errors-${el.name}-${this.id}`
        ) as HTMLElement;
        errors.innerHTML = "";
        errors.style.display = "none";
      });
      modalContainer.style.display = "none";
    };
  }

  listen(): void {
    const alertSuccess: HTMLElement = document.createElement("div");
    document.body.appendChild(alertSuccess);
    alertSuccess.id = `${this.id}-alert-success`;
    alertSuccess.className = "alert-success";
    alertSuccess.innerHTML = `${this.action} successfully completed`;
    const modalContainer: HTMLElement = document.getElementById(
      this.id
    ) as HTMLElement;
    window.addEventListener("click", (event: Event): void => {
      if (event.target === modalContainer) {
        this.closeCallBack();
      }
    });
    const closeButton: HTMLButtonElement = document.getElementById(
      `close-modal-${this.id}`
    ) as HTMLButtonElement;
    const cancelButton: HTMLButtonElement = document.getElementById(
      `modal-cancel-${this.id}`
    ) as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      this.closeCallBack();
    });
    cancelButton.addEventListener("click", () => {
      this.closeCallBack();
    });
    const submitButton: HTMLButtonElement = document.getElementById(
      `submit_${this.id}`
    ) as HTMLButtonElement;
    submitButton.addEventListener("click", async () => {
      const form: HTMLFormElement = document.getElementById(
        `modal-form-${this.id}`
      ) as HTMLFormElement;
      const valuesList: string[] = [];
      this.elements.forEach((el: IModalWindowElement) => {
        if (form[el.name]) {
          valuesList.push(form[el.name].value);
        }
      });
      try {
        if (
          valuesList.length === 3 &&
          valuesList[0] &&
          valuesList[1] &&
          valuesList[2]
        ) {
          const userData:
            | IUser
            | IUserExistsError
            | IUserEmailOrPasswordIncorrect
            | ILogin
            | unknown = await this.saveCallback(
            valuesList[0],
            valuesList[1],
            valuesList[2]
          );
          if ((userData as IUser).id) {
            alertSuccess.style.display = "block";
            setTimeout(() => {
              alertSuccess.style.display = "none";
            }, 3000);
            modalContainer.style.display = "none";
            window.location.reload();
          } else {
            this.elements.forEach((el: IModalWindowElement): void => {
              if (
                (userData as
                  | IUserExistsError
                  | IUserEmailOrPasswordIncorrect) &&
                Object.keys(
                  userData as IUserExistsError | IUserEmailOrPasswordIncorrect
                ).indexOf(el.name) !== -1
              ) {
                const errors: HTMLElement = document.getElementById(
                  `errors-${el.name}-${this.id}`
                ) as HTMLElement;
                if (el.name === "email") {
                  errors.innerHTML = `${
                    (
                      userData as
                        | IUserExistsError
                        | IUserEmailOrPasswordIncorrect
                    ).email
                  }`;
                } else if (el.name === "password") {
                  errors.innerHTML = `${
                    (userData as IUserEmailOrPasswordIncorrect).password
                  }`;
                }
                errors.style.display = "block";
              }
            });
          }
        }
        if (valuesList.length === 2 && valuesList[0] && valuesList[1]) {
          const loginData: ILogin | UserLoginInformationType | void = await (
            this.saveCallback as (
              email: string,
              password: string
            ) => Promise<ILogin | UserLoginInformationType | void>
          )(valuesList[0], valuesList[1]);
          if (loginData && Object.keys(loginData).indexOf("token") !== -1) {
            alertSuccess.style.display = "block";
            setTimeout(() => {
              alertSuccess.style.display = "none";
            }, 3000);
            modalContainer.style.display = "none";
            window.location.reload();
            (
              document.getElementById("button-login") as HTMLElement
            ).classList.add("logout");
          } else {
            this.elements.forEach((el: IModalWindowElement): void => {
              if (loginData && Object.keys(loginData).indexOf(el.name) !== -1) {
                const errors: HTMLElement = document.getElementById(
                  `errors-${el.name}-${this.id}`
                ) as HTMLElement;
                if (el.name === "email") {
                  errors.innerHTML = `${
                    (loginData as UserLoginInformationType).email
                  }`;
                } else if (el.name === "password") {
                  errors.innerHTML = `${
                    (loginData as UserLoginInformationType).password
                  }`;
                }
                errors.style.display = "block";
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  render(): void {
    if (document.getElementById(this.id)) {
      return;
    }
    const modalContainer: HTMLElement = document.createElement("div");
    modalContainer.id = this.id;
    modalContainer.className = "modal";
    const modalForm: HTMLFormElement = document.createElement("form");
    modalContainer.appendChild(modalForm);
    modalForm.className = "modal-content modal-animate";
    modalForm.id = `modal-form-${this.id}`;
    modalForm.noValidate = true;
    const headerContainer: HTMLDivElement = document.createElement("div");
    const closeButton: HTMLSpanElement = document.createElement("span");
    headerContainer.className = "modal-header-container";
    const modalTitle: HTMLElement = document.createElement("h3");
    modalTitle.className = "modal-title";
    modalTitle.innerHTML = capitalizeFirstLetter(this.action);
    closeButton.className = "close-modal";
    closeButton.id = `close-modal-${this.id}`;
    closeButton.title = "Close Modalwindow";
    closeButton.innerHTML = "x";
    headerContainer.appendChild(modalTitle);
    headerContainer.appendChild(closeButton);
    modalForm.appendChild(headerContainer);
    const container: HTMLDivElement = document.createElement("div");
    container.className = "container";
    const submitButton: HTMLButtonElement = document.createElement("button");
    submitButton.innerHTML = this.action;
    submitButton.type = "button";
    submitButton.id = `submit_${this.id}`;
    this.elements.forEach((el: IModalWindowElement): void => {
      const elementLabel: HTMLLabelElement = document.createElement("label");
      const elementInput: HTMLInputElement = document.createElement("input");
      const elementLabelText: HTMLElement = document.createElement("b");
      const elementErrors: HTMLElement = document.createElement("div");
      elementErrors.id = `errors-${el.name}-${this.id}`;
      elementErrors.className = "alert-error";
      elementErrors.style.display = "none";
      elementLabelText.innerHTML = capitalizeFirstLetter(el.name);
      elementLabel.appendChild(elementLabelText);
      elementInput.type = el.type;
      elementInput.id = `${el.name}-${this.id}`;
      elementInput.name = el.name;
      elementInput.placeholder = el.placeholder;
      elementInput.required = el.required;
      elementLabel.htmlFor = el.name;
      if (el.minLength) {
        elementInput.minLength = el.minLength;
      }
      if (el.maxLength) {
        elementInput.maxLength = el.maxLength;
      }
      container.appendChild(elementErrors);
      container.appendChild(elementLabel);
      container.appendChild(elementInput);
    });
    container.appendChild(submitButton);
    modalForm.appendChild(container);
    const footerModalContainer: HTMLDivElement = document.createElement("div");
    footerModalContainer.className = "modal-footer-container";
    const cancelButton: HTMLButtonElement = document.createElement("button");
    cancelButton.className = "modal-cancel-button";
    cancelButton.id = `modal-cancel-${this.id}`;
    cancelButton.innerHTML = "Cancel";
    footerModalContainer.appendChild(cancelButton);
    modalForm.appendChild(footerModalContainer);
    document.body.appendChild(modalContainer);
    this.listen();
  }
}
