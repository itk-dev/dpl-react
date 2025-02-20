import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Loan list", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
  });

  it("Loads loan list with loan overdue", () => {
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work", "@cover"]);
    cy.get(".list-reservation").should(
      "have.text",
      "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Du pålægges et gebyr, når materialet afleveres0dageOverskredetAfleveres 14-07-2022Du pålægges et gebyr, når materialet afleveres"
    );
  });

  it("Loads loan list with material with warning", () => {
    const wednesday20220713 = new Date("2022-07-13T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-07-13
    cy.clock(wednesday20220713);
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work", "@cover"]);

    cy.get(".list-reservation").should(
      "have.text",
      "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)1dageUdløber snartAfleveres 14-07-2022"
    );
  });

  it("Loads loan list with material with without warning", () => {
    const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-07-07
    cy.clock(thursday20220707);
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work", "@cover"]);

    cy.get(".list-reservation").should(
      "have.text",
      "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)7dageAfleveres 14-07-2022"
    );
  });

  it("Loads loan list and stacks material with same duedate", () => {
    const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-07-07
    cy.clock(thursday20220707);
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work", "@cover"]);

    cy.get(".list-reservation").should("have.length", 2);
    cy.get("#test-stack").click();
    cy.get(".list-reservation").should("have.length", 1);
  });

  it("It opens modal", () => {
    const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-07-07
    cy.clock(thursday20220707);
    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956235757,
            materialItemNumber: "5367667038",
            recordId: "62128216",
            periodical: null,
            loanDate: "2022-06-13T15:30:25.845",
            dueDate: "2022-07-14",
            loanType: "interLibraryLoan",
            ilBibliographicRecord: {
              author: "Johannessen, Charlotte U.",
              bibliographicCategory: "mono",
              edition: "2. utgave",
              isbn: "9788244624312",
              issn: null,
              language: "nor",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "Oslo",
              publicationDate: "2022",
              publicationDateOfComponent: null,
              publisher: "KF",
              recordId: "62128216",
              title:
                "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
            },
            materialGroup: {
              name: "fje",
              description: "Fjernlån 31 dage"
            }
          }
        },
        {
          isRenewable: true,
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-06-13T16:43:25.325",
            dueDate: "2022-07-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");

    cy.intercept("GET", "**covers**", {
      statusCode: 200,
      body: []
    }).as("cover");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work", "@cover"]);

    cy.get("#test-stack").click();
    cy.get("#test-more-materials").click();
    cy.get(".modal").find(".list-materials").should("have.length", 4);
    cy.get(".modal")
      .find("#renew-several")
      .should("have.text", "Forny mulige (1)");
    cy.get(".modal")
      .find(".list-materials")
      .eq(0)
      .should(
        "have.text",
        "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Materialet er udlånt fra en anden kommune og fornyelsen er derfor betinget af et andet biblioteks acceptAfleveres \n            14-07-2022"
      );
    cy.get(".modal")
      .find(".list-materials")
      .eq(1)
      .should(
        "have.text",
        "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Materialet kan ikke fornyes flere gangeAfleveres \n            14-07-2022"
      );
    cy.get(".modal")
      .find(".list-materials")
      .eq(2)
      .should(
        "have.text",
        "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Afleveres \n            14-07-2022"
      );
    cy.get(".modal")
      .find(".list-materials")
      .eq(3)
      .should(
        "have.text",
        "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Afleveres \n            14-07-2022"
      );
  });
});

export {};
