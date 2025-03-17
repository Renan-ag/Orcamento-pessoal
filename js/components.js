// Componente de barra de navegação (Navigation Bar)
class NavigationBar extends HTMLElement {
  constructor() {
    super();
    const path = this.getAttribute("path") || "/";

    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark mb-5">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src="./images/logo.png" width="50" height="35" alt="Orçamento pessoal">
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link ${path == "/" && "active"}" href="/">Cadastro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${path == "consulta" && "active"}" href="consulta.html">Consulta</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
  }
}

customElements.define("navigation-bar", NavigationBar);

// Componente de formulário de despesa  (Form expense)
class ExpenseForm extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute('title') || "Form Title";
    const formAction = this.getAttribute('formAction') || "add";

    this.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="col mb-4">
              <h1 class="display-4 fw-semibold text-white">${title}</h1>
            </div>
          </div>

          <form id="expenseForm" data-action="${formAction}">
            <div class="row mb-2">
              <div class="col-md-2 mb-2 mb-md-0">
                <select class="form-control form-select" id="year">
                  <option selected hidden value="">Ano</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>

              <div class="col-md-2 mb-2 mb-md-0">
                <select class="form-control form-select" id="month">
                  <option selected hidden value="">Mês</option>
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                  <option value="4">Abril</option>
                  <option value="5">Maio</option>
                  <option value="6">Junho</option>
                  <option value="7">Julho</option>
                  <option value="8">Agosto</option>
                  <option value="9">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>

              <div class="col-md-2 mb-2 mb-md-0">
                <input type="number" max="31" min="1" class="form-control" placeholder="Dia" id="day" />
              </div>

              <div class="col-md-6 mb-2 mb-md-0">
                <select class="form-control form-select" id="type">
                  <option selected hidden value="">Tipo</option>
                  <option value="1">Alimentação</option>
                  <option value="2">Educação</option>
                  <option value="3">Lazer</option>
                  <option value="4">Saúde</option>
                  <option value="5">Transporte</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 mb-2 mb-md-0">
                <input type="text" class="form-control" placeholder="Descrição" id="description" />
              </div>

              <div class="col-md-2 mb-5 mb-md-0">
                <input type="number" step=".1" class="form-control" placeholder="Valor" id="value" />
              </div>

              <div class="col-md-2 d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" id='clear-inputs'>
                  <i class="fa fa-eraser"></i>
                </button>
                <button type="submit" class="btn btn-primary">
                  ${formAction === "add" ? '<i class="fas fa-plus"></i>' : '  <i class="fas fa-search"></i>'}
                </button>                
              </div>
            </div>
          </form>
        </div>`;
  }
}

customElements.define("expense-form", ExpenseForm);