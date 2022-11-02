import { create } from "@storybook/theming";

const logoBase64 =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAuMDIgNDM5LjY5Ij48cGF0aCBkPSJNODcwLjg5IDM0NC4wN3EtNS4yOC0zLjE1LTEzLjI2LTMuMTVhMjMuODMgMjMuODMgMCAwIDAtNi44MiAxIDMwLjA4IDMwLjA4IDAgMCAwLTYuNjkgMi44OSAyOS40OCAyOS40OCAwIDAgMC01Ljc5IDQuMzYgMjMuNiAyMy42IDAgMCAwLTMuNTMgNC40OCAyMi4xNSAyMi4xNSAwIDAgMC0zLjQyLTUuODkgMTcuNjIgMTcuNjIgMCAwIDAtNy4yLTUuMiAyNS45MSAyNS45MSAwIDAgMC05LjUyLTEuNjcgMjMgMjMgMCAwIDAtNi45NSAxLjA5IDMwIDMwIDAgMCAwLTYuNjMgMyAyMi42MiAyMi42MiAwIDAgMC01LjQ2IDQuNjJjLS40My41LS43NyAxLjA1LTEuMTUgMS41N2wtLjI3LTloLTE3LjYzdjY3Ljk1aDE4LjI3di00MC42OGExMS42MyAxMS42MyAwIDAgMSAxLjEtNSAxMy43NCAxMy43NCAwIDAgMSAyLjg5LTQgMTIuNjIgMTIuNjIgMCAwIDEgNC4zMS0yLjcgMTUuMjMgMTUuMjMgMCAwIDEgNS40Ny0xIDExLjEyIDExLjEyIDAgMCAxIDYgMS41NCAxMC4wOCAxMC4wOCAwIDAgMSAzLjc5IDQuNTYgMTcuNjkgMTcuNjkgMCAwIDEgMS4zNSA3LjI2djQwLjA3aDE4LjI3di00MC42MWExMi40OSAxMi40OSAwIDAgMSAxLTUuMTQgMTIuMTQgMTIuMTQgMCAwIDEgMi44OS00IDEzLjI4IDEzLjI4IDAgMCAxIDQuMzctMi43IDE1LjIzIDE1LjIzIDAgMCAxIDUuNDctMSAxMi4xIDEyLjEgMCAwIDEgNi4zMSAxLjQ3IDkuNDYgOS40NiAwIDAgMSAzLjczIDQuNDQgMTkgMTkgMCAwIDEgMS4yOSA3LjU3djM5Ljk1aDE4LjI3di00MS4yM2E0MCA0MCAwIDAgMC0yLjY0LTE1LjQxIDE5LjI0IDE5LjI0IDAgMCAwLTcuOTEtOS40NG0tMzY3LjM3IDE1LjE1YTE3LjM2IDE3LjM2IDAgMCAxIDkuMzItMi41IDE4Ljc1IDE4Ljc1IDAgMCAxIDYuNSAxLjE1IDIzLjM0IDIzLjM0IDAgMCAxIDUuODYgMy4xNSAyMSAyMSAwIDAgMSA0LjUgNC40M2wxMC0xMi4wN2EyOC4yIDI4LjIgMCAwIDAtMTEuODQtOS4yNSA0MSA0MSAwIDAgMC0xNi43My0zLjM0IDMzIDMzIDAgMCAwLTI5LjY2IDE3LjI4IDM5LjExIDM5LjExIDAgMCAwIDAgMzYuMTYgMzMuMTQgMzMuMTQgMCAwIDAgMjkuNjYgMTcuMjEgNDAgNDAgMCAwIDAgMTYuMzgtMy40NCAzMSAzMSAwIDAgMCAxMi4xLTguOTNMNTI5LjYxIDM4N2EyNiAyNiAwIDAgMS00LjgzIDQuNjMgMjAuMSAyMC4xIDAgMCAxLTUuNTkgMi44OSAyMC4zOCAyMC4zOCAwIDAgMS02LjMxIDEgMTYuNzcgMTYuNzcgMCAwIDEtOS4yNi0yLjY0IDE5IDE5IDAgMCAxLTYuNS02LjkzIDE5LjkyIDE5LjkyIDAgMCAxLTIuMzgtOS44MyAyMSAyMSAwIDAgMSAyLjMyLTEwIDE3LjUyIDE3LjUyIDAgMCAxIDYuMzctNi44N200MzUuNzQtMTcuMDUtMTQuMjggNDAuMDhjLS42NCAyLTEuMjggMy44Ny0xLjkyIDUuNjUtLjE2LS40OS0uMjktMS0uNDYtMS40OGE0NS44OCA0NS44OCAwIDAgMC0yLTUuMDdsLTE2LjU5LTM5LjE4SDg4My4ybDMwLjc0IDY3LjY5LTEyLjczIDI5LjhoMTguNTNsMTEuNzEtMjkuNTRMOTYwIDM0Mi4yWk03NTAgMzY5LjA1aC0zMS4yOGExOS42NiAxOS42NiAwIDAgMSAxLjM5LTQuMTEgMTQuMTggMTQuMTggMCAwIDEgNi02LjQyIDE5LjQzIDE5LjQzIDAgMCAxIDkuNTktMi4xOSAxNS40NiAxNS40NiAwIDAgMSA3IDEuNTQgMTMuNTcgMTMuNTcgMCAwIDEgNS4wOCA0LjM3IDEyLjI5IDEyLjI5IDAgMCAxIDIuMjUgNi4zWm04LjU2LTE4LjY5YTMwIDMwIDAgMCAwLTEwLjIzLTcuMDYgMzIuNTQgMzIuNTQgMCAwIDAtMTIuODctMi41MSAzNiAzNiAwIDAgMC0xMy44MyAyLjYzIDMyLjEzIDMyLjEzIDAgMCAwLTExIDcuNDUgMzQuNDEgMzQuNDEgMCAwIDAtNy4yMSAxMS4zNyAzOS4xNCAzOS4xNCAwIDAgMC0yLjU3IDE0LjM5IDM0LjY0IDM0LjY0IDAgMCAwIDQuNjMgMTggMzMuMDYgMzMuMDYgMCAwIDAgMTIuODcgMTIuMzMgNDEuODkgNDEuODkgMCAwIDAgMjguNjUgMy4zMiA0My43NCA0My43NCAwIDAgMCA5LjI2LTMuNCAzNy4wNSAzNy4wNSAwIDAgMCA4LjI0LTUuNTlsLTguNzUtMTIuMmEyOS40MiAyOS40MiAwIDAgMS04IDQuODggMjMuMTIgMjMuMTIgMCAwIDEtOC4yMyAxLjQxIDI0LjI5IDI0LjI5IDAgMCAxLTExLjM5LTIuNTEgMTguMDggMTguMDggMCAwIDEtNy40Ni03IDE4LjM5IDE4LjM5IDAgMCAxLTIuMTEtNS42NWg0OC40OWwuMTMtNS42NWEzNC40NCAzNC40NCAwIDAgMC0yLjA2LTEzLjQ4IDMxLjUgMzEuNSAwIDAgMC02LjYyLTEwLjczbS0zMzcuMDMgMjUuMzcgNS4xNC0xMy42MnExLTMgMi4xOS02dDIuMTgtNi4zNmMuNjgtMi4xNyAxLjM0LTQuMjkgMi02LjM4LjY0IDIgMS4zIDQuMTIgMiA2LjMxcTEuMTUgMy42IDIuMjUgNi44MXQxLjg3IDUuMjdsNS4yNSAxNFptMy4yMS01NS40OS0zNS4yNiA4OS45MWgxOS4wNWw3LjEzLTE4Ljg4aDM0LjU2bDcuMDcgMTguODhoMTkuODJsLTM1LjEzLTg5LjkxWm0xNjcuMTIgNjYuMDhhMTYuMTkgMTYuMTkgMCAwIDEtNiA2Ljg4IDE2LjUyIDE2LjUyIDAgMCAxLTkgMi40NCAxNiAxNiAwIDAgMS04LjgtMi40NCAxNi44NiAxNi44NiAwIDAgMS02LTYuODggMjMgMjMgMCAwIDEtMi4xOC0xMC4zMiAyMi4zNCAyMi4zNCAwIDAgMSAyLjE4LTEwLjE2IDE3LjQ2IDE3LjQ2IDAgMCAxIDYtNi44OCAxNS43MiAxNS43MiAwIDAgMSA4LjgyLTIuNSAxNi4yMiAxNi4yMiAwIDAgMSA5IDIuNSAxNi43NCAxNi43NCAwIDAgMSA2IDYuODggMjMgMjMgMCAwIDEgMi4xIDEwLjE2IDIzLjczIDIzLjczIDAgMCAxLTIuMTIgMTAuMzNtMS44Ni0zNS4xYTI1Ljg4IDI1Ljg4IDAgMCAwLTQuNTctNC45MSAyNC4xOCAyNC4xOCAwIDAgMC03LjMzLTQgMjcuMzEgMjcuMzEgMCAwIDAtOS4yLTEuNDggMjguMTcgMjguMTcgMCAwIDAtMTUuODIgNC41NiAzMiAzMiAwIDAgMC0xMSAxMi40NiAzOS4xNCAzOS4xNCAwIDAgMC00LjA2IDE4LjE0IDQwLjExIDQwLjExIDAgMCAwIDQgMTguMjMgMzIuMzMgMzIuMzMgMCAwIDAgMTAuODEgMTIuNTkgMjYuNjcgMjYuNjcgMCAwIDAgMTUuMzEgNC42MyAyNy4zNyAyNy4zNyAwIDAgMCA5LTEuNDggMjguNjMgMjguNjMgMCAwIDAgNy42NS00IDI2LjYxIDI2LjYxIDAgMCAwIDUtNC43M3Y4LjloMTguNFYzNDIuMmgtMTguMTlabTc4LjE2IDM1LjQyYTE3LjUgMTcuNSAwIDAgMS02LjA1IDcuMDYgMTUuOSAxNS45IDAgMCAxLTkgMi41NyAxNS41OCAxNS41OCAwIDAgMS04Ljk0LTIuNTcgMTcuMjIgMTcuMjIgMCAwIDEtNS45Mi03LjA2IDI3LjA2IDI3LjA2IDAgMCAxIDAtMjEgMTYuNjkgMTYuNjkgMCAwIDEgNS45Mi03LjA3IDE1Ljg1IDE1Ljg1IDAgMCAxIDguOTQtMi41IDE2LjE4IDE2LjE4IDAgMCAxIDkgMi41IDE3IDE3IDAgMCAxIDYuMDUgNy4wNyAyNi4zOCAyNi4zOCAwIDAgMSAwIDIxbTEuNTQtMzcuMjVhMjYuMjIgMjYuMjIgMCAwIDAtMy41NC0zLjA5IDI5LjU5IDI5LjU5IDAgMCAwLTE3LjE3LTUuNTIgMjguNDMgMjguNDMgMCAwIDAtMTYgNC42MkEzMi4yNyAzMi4yNyAwIDAgMCA2MjUuNTYgMzU4YTQzIDQzIDAgMCAwIDAgMzYuNDIgMzEuNzIgMzEuNzIgMCAwIDAgMTEuMTMgMTIuNDYgMjguODQgMjguODQgMCAwIDAgMTYgNC41NiAzMC4yMiAzMC4yMiAwIDAgMCA5LjA3LTEuMzUgMjguMDYgMjguMDYgMCAwIDAgNy43Mi0zLjczIDIyLjQxIDIyLjQxIDAgMCAwIDQuNTItNC4xNmwuMzkgNy45NWgxNy4yNHYtOTVoLTE4LjI3Wm0yMDkuNDgtMTU0LjkzaDE4LjI3djk1LjA1aC0xOC4yN3pNNjIwIDIwNWMyIDEuNzIgNC43MSAyLjU3IDguMjMgMi41N2ExMS44MSAxMS44MSAwIDAgMCA4LjE3LTIuNyA5LjEzIDkuMTMgMCAwIDAgMy03LjE5IDkuMjQgOS4yNCAwIDAgMC0zLTcuMjZxLTMtMi42Mi04LjI0LTIuNjNhMTEuNjYgMTEuNjYgMCAwIDAtOC4xNyAyLjc2QTEwLjIyIDEwLjIyIDAgMCAwIDYyMCAyMDVtNDggNDAuNDZhMTguMTggMTguMTggMCAwIDEgNi4zLTYuOTMgMTcuNDkgMTcuNDkgMCAwIDEgMTguMTQtLjA3IDE3LjIxIDE3LjIxIDAgMCAxIDYuMjQgNi45NCAyMiAyMiAwIDAgMSAyLjI2IDEwLjA4IDIxLjcyIDIxLjcyIDAgMCAxLTIuMjYgMTAgMTcuMTkgMTcuMTkgMCAwIDEtNi4yNCA2LjkzIDE2LjU5IDE2LjU5IDAgMCAxLTkgMi41MSAxNi44MyAxNi44MyAwIDAgMS05LjEzLTIuNTEgMTcuNjIgMTcuNjIgMCAwIDEtNi4zLTYuOTMgMjMuODggMjMuODggMCAwIDEgMC0yMG0tMy4xNiA0MC43OWEzOS45MyAzOS45MyAwIDAgMCAzNy4wNiAwIDMzLjI5IDMzLjI5IDAgMCAwIDEyLjgtMTIuNTMgMzUuNTkgMzUuNTkgMCAwIDAgNC42My0xOC4yNCAzNS4yMSAzNS4yMSAwIDAgMC00LjYzLTE4LjE3IDMzLjkzIDMzLjkzIDAgMCAwLTEyLjgtMTIuNTMgMzkuNDcgMzkuNDcgMCAwIDAtMzcuMDYgMCAzNC4xIDM0LjEgMCAwIDAtMTcuNTYgMzAuNyAzNS4xNSAzNS4xNSAwIDAgMCA0LjcgMTguMjQgMzMuNzkgMzMuNzkgMCAwIDAgMTIuODYgMTIuNTNtMTU1LjgzLTQxLjA2YTE3LjM4IDE3LjM4IDAgMCAxIDYtNi44OCAxNS43MiAxNS43MiAwIDAgMSA4LjgyLTIuNSAxNi4yNSAxNi4yNSAwIDAgMSA5IDIuNSAxNi43MSAxNi43MSAwIDAgMSA2IDYuODggMjIuODcgMjIuODcgMCAwIDEgMi4xMyAxMC4xNSAyMy41OSAyMy41OSAwIDAgMS0yLjEzIDEwLjMzIDE2LjE3IDE2LjE3IDAgMCAxLTYgNi44OCAxNi41NSAxNi41NSAwIDAgMS05IDIuNDQgMTYgMTYgMCAwIDEtOC44Mi0yLjQ0IDE2Ljc5IDE2Ljc5IDAgMCAxLTYtNi44OCAyMyAyMyAwIDAgMS0yLjE5LTEwLjMzIDIyLjM0IDIyLjM0IDAgMCAxIDIuMTktMTAuMTVtLTUuNTMgNDFhMjYuNTggMjYuNTggMCAwIDAgMTUuMzEgNC42MyAyNy4zMSAyNy4zMSAwIDAgMCA5LTEuNDggMjguNjkgMjguNjkgMCAwIDAgNy42Ni00IDI2LjI0IDI2LjI0IDAgMCAwIDUtNC43M3Y4LjloMTguNHYtNjcuOTZoLTE4LjE5djlhMjUuODggMjUuODggMCAwIDAtNC41Ny00LjkxIDI0LjMgMjQuMyAwIDAgMC03LjMzLTQgMjcuMzYgMjcuMzYgMCAwIDAtOS4yLTEuNDggMjguMiAyOC4yIDAgMCAwLTE1LjgzIDQuNTYgMzIgMzIgMCAwIDAtMTEgMTIuNDYgMzkuMjYgMzkuMjYgMCAwIDAtNCAxOC4xOCA0MC4xMSA0MC4xMSAwIDAgMCA0IDE4LjIzIDMyLjMzIDMyLjMzIDAgMCAwIDEwLjgxIDEyLjU5bS0yMTcuMjItODEuODRoLTE4LjI3djE3LjIxaC0xMi43NHYxNi4zMWgxMi43NHY1MS42NGgxOC4yN3YtNTEuNjRoMTMuOXYtMTYuMzFoLTEzLjl2LTE3LjIxem0yMS4yNCAxNy4yMWgxOC4yN3Y2Ny45NWgtMTguMjd6bTE3Mi4wNiA2Ny45NXYtNDEuNjFhMzkuNDcgMzkuNDcgMCAwIDAtMi42NC0xNS4zNiAxOS4xIDE5LjEgMCAwIDAtNy44NS05LjMxIDI1LjA1IDI1LjA1IDAgMCAwLTEyLjkzLTMuMDggMjYuMTIgMjYuMTIgMCAwIDAtMTAuODEgMi4zMSAyOC4yIDI4LjIgMCAwIDAtOC44MSA2LjEgMjQuNjUgMjQuNjUgMCAwIDAtMS42NyAxLjkybC0uMzMtOC45MmgtMTcuNXY2Ny45NUg3NDd2LTQwLjg1YTExLjUzIDExLjUzIDAgMCAxIDEuMDktNSAxMy42NCAxMy42NCAwIDAgMSAzLTQuMTEgMTIuNjkgMTIuNjkgMCAwIDEgNC41LTIuNzcgMTYuNjUgMTYuNjUgMCAwIDEgNS43My0xIDExLjU5IDExLjU5IDAgMCAxIDYuNSAxLjIyIDkuMDcgOS4wNyAwIDAgMSAzLjkyIDQuNTYgMjAuMDYgMjAuMDYgMCAwIDEgMS4yOSA3LjcxdjQwLjJaTTQwMC4xIDE5OS42MXY4OS45MUg0MTl2LTU3Ljg2bDQzLjM2IDU3Ljg2aDE3LjQ5di04OS45MUg0NjF2MjQuNTNjMCAzLjY4IDAgNy4wOS4xMyAxMC4yMXMuMTkgNi4wOS4zMiA4Ljg3LjMgNS40OC41MiA4LjA5LjQ1IDUuMTguNyA3LjdjLjA3LjY2LjE2IDEuMzUuMjQgMmwtNDUuNTMtNjEuNDFabTEzOS41MiA2Ni4wOGExNi4xOSAxNi4xOSAwIDAgMS02IDYuODggMTYuNTMgMTYuNTMgMCAwIDEtOSAyLjQ0IDE2IDE2IDAgMCAxLTguODEtMi40NCAxNi43OSAxNi43OSAwIDAgMS02LTYuODggMjMuMDUgMjMuMDUgMCAwIDEtMi4xOS0xMC4zNCAyMi4zMyAyMi4zMyAwIDAgMSAyLjE5LTEwLjE0IDE3LjI5IDE3LjI5IDAgMCAxIDYtNi44NyAxNS41NiAxNS41NiAwIDAgMSA4LjgxLTIuNTEgMTYuMDggMTYuMDggMCAwIDEgOSAyLjUxIDE2LjY0IDE2LjY0IDAgMCAxIDYgNi44NyAyMyAyMyAwIDAgMSAyLjEyIDEwLjE0IDIzLjc0IDIzLjc0IDAgMCAxLTIuMTIgMTAuMzRtMjAgMjMuODN2LTY3Ljk1aC0xOC4xNHY5YTI2LjIxIDI2LjIxIDAgMCAwLTQuNTctNC45MSAyNC4xOCAyNC4xOCAwIDAgMC03LjMzLTQgMjcuMzYgMjcuMzYgMCAwIDAtOS4yLTEuNDggMjguMiAyOC4yIDAgMCAwLTE1LjgzIDQuNTYgMzIgMzIgMCAwIDAtMTEgMTIuNDYgMzkuMjUgMzkuMjUgMCAwIDAtNC4wNSAxOC4xNyA0MC4yIDQwLjIgMCAwIDAgNCAxOC4yNSAzMi4yOSAzMi4yOSAwIDAgMCAxMC44MSAxMi41OCAyNi42NyAyNi42NyAwIDAgMCAxNS4zMSA0LjYzIDI3LjMxIDI3LjMxIDAgMCAwIDktMS40OCAyOC44NCAyOC44NCAwIDAgMCA3LjY2LTQgMjUuNjkgMjUuNjkgMCAwIDAgNS00Ljc0djguOTFaTTQxNS43NCAxMTIuMzdhMjUuMjYgMjUuMjYgMCAwIDEgNS40Ni04LjkyIDI2IDI2IDAgMCAxIDguMzctNS45MUEyNS4zNCAyNS4zNCAwIDAgMSA0NDAgOTUuNDJhMjUuODggMjUuODggMCAwIDEgMTAuNDkgMi4xMiAyNC4zNSAyNC4zNSAwIDAgMSA4LjI5IDUuOTEgMjggMjggMCAwIDEgNS40NyA4LjkyIDMzIDMzIDAgMCAxIDAgMjIuNjEgMjguNzkgMjguNzkgMCAwIDEtNS40NyA5IDIzLjMyIDIzLjMyIDAgMCAxLTguMjkgNS45MSAyNi41MyAyNi41MyAwIDAgMS0xMC40OSAyLjA1IDI2IDI2IDAgMCAxLTEwLjQyLTIuMDYgMjQuODMgMjQuODMgMCAwIDEtOC4zOC01Ljg4IDI1LjkxIDI1LjkxIDAgMCAxLTUuNDYtOSAzNS4xMSAzNS4xMSAwIDAgMSAwLTIyLjYxTTQwNy4xMSAxNTdhNDQuNzYgNDQuNzYgMCAwIDAgMTQuNjEgOS43IDUwLjEyIDUwLjEyIDAgMCAwIDM2LjYgMCA0NC4zMSA0NC4zMSAwIDAgMCAxNC41NC05LjcgNDMuMzIgNDMuMzIgMCAwIDAgOS41OS0xNC43OCA1Mi44OCA1Mi44OCAwIDAgMCAwLTM3IDQzLjM3IDQzLjM3IDAgMCAwLTkuNTktMTQuNzcgNDQuMTUgNDQuMTUgMCAwIDAtMTQuNTQtOS43NiA1MCA1MCAwIDAgMC0zNi42IDAgNDQuMTQgNDQuMTQgMCAwIDAtMTQuNjEgOS43NiA0My40OCA0My40OCAwIDAgMC05LjU4IDE0LjcxIDQ5LjggNDkuOCAwIDAgMC0zLjM1IDE4LjU2IDUwLjQ4IDUwLjQ4IDAgMCAwIDMuMzUgMTguNTYgNDIuNSA0Mi41IDAgMCAwIDkuNTggMTQuNzJtMTA2LjA5LTMyLjQyYTE3LjM4IDE3LjM4IDAgMCAxIDYtNi44OCAxNS43MiAxNS43MiAwIDAgMSA4LjgyLTIuNSAxNi4yOCAxNi4yOCAwIDAgMSA5IDIuNSAxNi43OCAxNi43OCAwIDAgMSA2IDYuODggMjMgMjMgMCAwIDEgMi4xMiAxMC4xNCAyMy43NCAyMy43NCAwIDAgMS0yLjE0IDEwLjM0IDE2LjIzIDE2LjIzIDAgMCAxLTYgNi44OCAxNi41OCAxNi41OCAwIDAgMS05IDIuNDQgMTYgMTYgMCAwIDEtOC44Mi0yLjQ0IDE2Ljc5IDE2Ljc5IDAgMCAxLTYtNi44OCAyMy4wNSAyMy4wNSAwIDAgMS0yLjE4LTEwLjM0IDIyLjMzIDIyLjMzIDAgMCAxIDIuMTktMTAuMTRtLTUuNTMgNDFhMjYuNjEgMjYuNjEgMCAwIDAgMTUuMzQgNC41OSAyNy4zNyAyNy4zNyAwIDAgMCA5LTEuNDcgMjguNjMgMjguNjMgMCAwIDAgNy42NS00IDI2LjM1IDI2LjM1IDAgMCAwIDUtNC43NHY4LjkxSDU2M3YtNjcuOTNoLTE4LjE1djlhMjYuMTUgMjYuMTUgMCAwIDAtNC41Ni00LjkxIDI0LjM2IDI0LjM2IDAgMCAwLTcuMzQtNCAyNy4zMSAyNy4zMSAwIDAgMC05LjItMS40OCAyOC4xOSAyOC4xOSAwIDAgMC0xNS44MiA0LjU2IDMyIDMyIDAgMCAwLTExIDEyLjQ2IDM5LjE2IDM5LjE2IDAgMCAwLTQuMDYgMTguMTcgNDAuMTYgNDAuMTYgMCAwIDAgNCAxOC4yNCAzMi4zMyAzMi4zMyAwIDAgMCAxMC44MSAxMi41OW04NC43My0xNy45NCA2LjIyLTUuODIgMjEuNTcgMjcuMDhoMjJsLTMxLjQ3LTM4LjQgMzEuNi0yOS41NWgtMjQuMDZsLTI1Ljg2IDI2LjEzVjczLjg0aC0xOC4yN3Y5NS4wNWgxOC4yN3YtMjEuMjZ6bS00NTEuNzgtNDYuMjZjLTIuMzYuMzUtNC41IDEuMzQtNi44NCAxLjEyLS4zNyAwLS43NS4yNC0xLjEzLjM0LTIgLjUyLTMuODkgMS41LTYuMDggMS4zMmE2LjE4IDYuMTggMCAwIDAtMi41NS43NGMtMS42Ny42Ni0zLjI5IDEuNDMtNSAyLjA3YTE2NC4wOSAxNjQuMDkgMCAwIDAtMTUuNzIgNi41MWMtMy4xMiAxLjU5LTUuOTEgMy42NS05IDUuMjQtLjYxLjMyLTEuMTcgMS0xLjggMS0yLjA3LjE5LTMuMzggMS42MS00Ljg0IDIuNzctMi42NiAyLjEtNS4yNSA0LjI5LTcuOTIgNi4zNy0uODQuNjYtMS45MyAxLTIuNzUgMS42Ny0yIDEuNjUtNCAzLjMzLTUuODIgNS4xNi0zLjY3IDMuNjQtNy40OSA3LjE1LTEwLjg2IDExLjA5YTc4LjU0IDc4LjU0IDAgMCAwLTcuMzIgOS40MiAzLjM4IDMuMzggMCAwIDEtLjY3IDFjLTIuNDMgMS43Ni0zLjQxIDQuNjQtNS4yOSA2LjgxLTEuMzUgMS41NC0xLjY2IDMuNTktMi43MyA1LjI3LTEuMjIgMS45MS0yLjMyIDMuODktMy42MiA1Ljc2YTE5Ljc3IDE5Ljc3IDAgMCAwLTIuMjUgNC4yIDYxIDYxIDAgMCAxLTIuNDQgNi4wNCA1Ny4xOCA1Ny4xOCAwIDAgMC0yLjM2IDYuNDZjLTEuMTEgMy4xLTIuMjQgNi4xOC0zLjMgOS4yOWEyMS4zMiAyMS4zMiAwIDAgMC0uNTUgMi42NGMtLjkzIDQuOC0xLjkyIDkuNTktMi43OCAxNC40LS4zIDEuNjYtLjMgMy4zNi0uNDQgNS4xM2EzNiAzNiAwIDAgMCA2LjEgMS42N2MyLjMuNjEgNC42NCAxLjA2IDcgMS42NSAzIC43NiA2IDEuNjEgOC45NCAyLjQxIDIgLjUzIDIuMjIuNzEgMi4zNCAyLjg2LjExIDEuOS4xOSAzLjguMTIgNS43YTExNC4yOCAxMTQuMjggMCAwIDAgLjQ3IDE3LjM1Yy4zMSAyLjc3LjM1IDUuNTguNTggOC4zNy4xNiAxLjg4LjQgMy43Ni42NiA1LjY0LjEuNzguNDIgMS41My41MyAyLjMyLjMgMiAxLjE5IDMuNzggMS4xIDUuODYtLjA1IDEuMTEuNjUgMi4yNiAxIDMuMzhzLjkgMiAuNTYgMy4xOGEuNDEuNDEgMCAwIDAgMCAuMjkgNDguNTcgNDguNTcgMCAwIDEgMi4yMSA4Yy41MyAyLjMxIDEuNjggNC40NCAxLjg3IDYuODhhNyA3IDAgMCAwIDEuMDYgMi40NSA4Mi40IDgyLjQgMCAwIDEgMy40NSA3LjU5YzEuNDMgMy41OSAzLjMgNyA1IDEwLjUxIDEuMjYgMi42IDIuNTIgNS4xOSAzLjc3IDcuNzlhOC4xNCA4LjE0IDAgMCAwIC41NyAxLjM4YzIuNTkgMy40MSA0LjI5IDcuNDEgNyAxMC43OC45MiAxLjE3IDEuNzMgMi40MyAyLjU5IDMuNjVhMi4xMyAyLjEzIDAgMCAxIC4xNi4yNWMuNTEuOTMuMTYgMi4xNSAxLjI0IDIuOTNhMTYuODMgMTYuODMgMCAwIDEgMi4yOSAyLjMzYy4yOC4yOS42Ny41NC44Ljg4IDEuMTUgMy4xMyAzLjgzIDUuMDYgNS44IDcuNTRhMTUgMTUgMCAwIDEgMS43NSAyLjM5IDEyLjYyIDEyLjYyIDAgMCAwIDIuMTEgMi40OCAxMS42NSAxMS42NSAwIDAgMSAxLjg0IDIgMTcuMzYgMTcuMzYgMCAwIDAgNC4xNyA0LjYyYzIuMzYgMi4xMyA0LjQ5IDQuNTIgNi43OSA2LjczIDIuMDkgMiA0LjI4IDMuODggNi40MyA1LjgxLjI5LjI3LjgzLjQxLjkzLjcyLjc4IDIuMzggMy4yMSAyLjc5IDQuODMgNC4xNiAxLjM2IDEuMTUgMyAyIDQgMy41NmE1LjExIDUuMTEgMCAwIDAgMS44NCAxLjQ4YzMuMiAxLjg0IDYuMiA0IDkuMyA2YTgwLjkzIDgwLjkzIDAgMCAwIDkuODMgNS42N2MyLjg4IDEuMzUgNS42OCAyLjg3IDguNjIgNC4xIDEuNzUuNzMgMy41NiAxLjM0IDUuMjQgMi4yIDIuODcgMS40OCA1LjYzLjkgOC4zNS0uMjcgMS42NC0uNzEgMy4xOS0xLjYzIDQuNzgtMi40NiAzLjYyLTEuODggNy4yNS0zLjc1IDEwLjg2LTUuNjcuNjktLjM2IDEuMjctLjkzIDEuOTQtMS4zNGExNi43NyAxNi43NyAwIDAgMSAyLjU4LTEuNDQgMTMuOSAxMy45IDAgMCAwIDIuODYtMS41NWMxLjY0LTEuMTIgMy40My0yIDUuMTQtM2EzNy4zMyAzNy4zMyAwIDAgMCA1Ljk0LTQgNy42NiA3LjY2IDAgMCAxIDItMS4yNSA1LjYzIDUuNjMgMCAwIDAgMi4yNy0xLjg2IDkuNTggOS41OCAwIDAgMSAxLjgxLTEuNTNjMS44MS0xLjQyIDMuNjMtMi44MSA1LjQzLTQuMjIuOTMtLjc0IDEuODQtMS41MSAyLjc1LTIuMjhhMi44NSAyLjg1IDAgMCAwIC44My0uODNjLjc4LTEuNiAyLjI4LTIuNDcgMy41Mi0zLjYxczIuNDYtMi4zMyAzLjY1LTMuNTJjLjcxLS43IDEuMzItMS41MSAyLjA2LTIuMThhOS4zMiA5LjMyIDAgMCAwIDIuMTktMi44MiA4LjY1IDguNjUgMCAwIDEgMS4zNi0yYzIuMDktMi40MSA0LjIyLTQuNzggNi4zMi03LjE4YTQuMzQgNC4zNCAwIDAgMCAuODYtMS4yIDE1Ljc5IDE1Ljc5IDAgMCAxIDMuNzMtNS4zNiAxNi41NyAxNi41NyAwIDAgMCAzLjEtNS4zOCAxMi4zMiAxMi4zMiAwIDAgMSAyLTMuNjIgOS4xMiA5LjEyIDAgMCAwIDIuMS0zLjU4IDguNTQgOC41NCAwIDAgMSAuODgtMS44OWMxLjg0LTMuMyAzLjctNi41OSA1LjU0LTkuODkuODMtMS40OCAxLjY1LTIuOTIgMS4zMy00Ljc5YTUuMDcgNS4wNyAwIDAgMSAuNi0yLjI3Yy4zLS44NC42Ni0xLjY2IDEtMi40NyAxLjUyLTMuMzcgMi03LjA2IDMuMTgtMTAuNTNhNzQuNjcgNzQuNjcgMCAwIDAgMy41OC0xOC4zN2MuMzYtNC43OSAxLjQ0LTkuNDUgMi0xNC4yIDAtLjA5LjA5LS4xNy4yMi0uNDJhMy45IDMuOSAwIDAgMSAzLS41MmMzLjI3LjU2IDYuNTYgMCA5LjgzLjE5YTQ5IDQ5IDAgMCAwIDguNjUtLjExIDcuMzkgNy4zOSAwIDAgMSAxLjg2LjI3IDEyLjgxIDEyLjgxIDAgMCAxIC44NyA1LjUgODMuMTIgODMuMTIgMCAwIDAtLjE3IDguMzZjMCAuMy4wNi42OS0uMDkuODgtMS4xOSAxLjUtLjU5IDMuMjItLjY0IDQuODUtLjA4IDIuNyAwIDUuNC0xLjI0IDcuOTNhNS41OSA1LjU5IDAgMCAwLS40MiAyIDQ5LjQ3IDQ5LjQ3IDAgMCAxLTEuMjkgNy4zNGMtLjczIDMuMzMtMi4yNCA2LjQtMi45IDkuNzNhMS4zNiAxLjM2IDAgMCAxLS4yMS41NmMtMS43MSAyLjA5LTEuNzYgNC44My0yLjggNy4xOC0xLjE2IDIuNjQtMi4yNiA1LjMxLTMuNDIgOC0uNDMgMS0xLjEgMS45MS0xLjQ0IDIuOTQtLjk0IDIuODYtMy4wNiA1LjExLTQgOC0uNzQgMi4zMi0yLjI1IDQuMTktMy40MSA2LjI2YTI1LjE3IDI1LjE3IDAgMCAxLTMuNTUgNS40OGMtMS4zMyAxLjM5LTIgMy40MS0zIDUuMTNhNS40MSA1LjQxIDAgMCAxLTEuNDMgMS44NSAxNSAxNSAwIDAgMC00LjU1IDUuMzggMjguMzggMjguMzggMCAwIDEtMyA0LjEzYy0yLjY2IDMuMjItNS4yOCA2LjQ5LTguMjMgOS40NS0xLjg5IDEuOS0zLjM4IDQuMTgtNS41NiA1LjgyYTYuMzEgNi4zMSAwIDAgMC0uOTMgMS4xNiA1OS43NiA1OS43NiAwIDAgMS02LjI3IDYuMzYgMy40OCAzLjQ4IDAgMCAxLTEuMTkuODljLTEuNzkuNTUtMyAxLjg5LTQuMzcgMy0xLjgzIDEuNTMtMy43OSAyLjkxLTUuNjggNC4zOC0xIC44LTIgMS42Ny0zIDIuNDktLjQ2LjM3LS45MiAxLTEuNDMgMS0xLjgyLjE5LTMgMS40Ni00LjQzIDIuMzUtMi42OCAxLjcxLTUuMjEgMy42Ny03Ljg2IDUuNDRhMzEuMyAzMS4zIDAgMCAxLTQuNjIgMi42N2MtMyAxLjM0LTUuNzIgMy4yNS04LjczIDQuNTEtMi41NiAxLjA3LTUuMDYgMi4yNS03LjYxIDMuMzQtMS43My43NC0zLjM5IDEuNjUtNS4wOCAyLjQ5YTE1LjUyIDE1LjUyIDAgMCAxLTEuODYgMWMtMi4zNi43OC00Ljc1IDEuNS03LjEyIDIuMjVhNiA2IDAgMCAwLTEuMzkuNTQgNS42IDUuNiAwIDAgMS0zLjM2Ljk1IDMuMSAzLjEgMCAwIDAtMyAxLjQ4IDIwIDIwIDAgMCAxLTcuNDItMi40NiAzMC43NiAzMC43NiAwIDAgMC02LjMxLTIuNjEgMzMuNjcgMzMuNjcgMCAwIDEtNy4wNS0zLjI1IDI4LjU3IDI4LjU3IDAgMCAwLTUuODktMi45MSA3LjIyIDcuMjIgMCAwIDEtMi0xLjIyIDQuNzEgNC43MSAwIDAgMC0yLjEyLTEgNS42MiA1LjYyIDAgMCAxLTIuODQtMS41NSA5LjQyIDkuNDIgMCAwIDAtNC0yLjQgNy42MSA3LjYxIDAgMCAxLTIuMjEtMS40N2MtMS41NC0xLjA4LTIuODctMi40Mi00LjgyLTIuODhhNi40NiA2LjQ2IDAgMCAxLTIuMTYtMS41MmMtMS42My0xLjMyLTMuMDYtMy00Ljg3LTMuOTVhNjAuNjQgNjAuNjQgMCAwIDEtNS44Ni00LjA5IDY0LjQ5IDY0LjQ5IDAgMCAxLTktNy44OCA1NC4zMiA1NC4zMiAwIDAgMC03LjQ1LTYuODQgNy4xNSA3LjE1IDAgMCAxLTEuMTEtMWMtMi4zNi0yLjU1LTQuNzMtNS4xMS03LjA3LTcuNjlhMTIuNTUgMTIuNTUgMCAwIDEtMS0xLjQ1QTcuMTIgNy4xMiAwIDAgMCA3OSAzNzdhMzguMDggMzguMDggMCAwIDEtNS4zNS02Yy0xLjY3LTIuMDktMy41Ni00LTQuNzYtNi40OGEyIDIgMCAwIDAtLjQ1LS43N2MtMi4zOS0xLjczLTMtNC42MS00LjU1LTYuODktMS0xLjU0LTEuOS0zLjI2LTMuNTItNC4zOUE0LjYzIDQuNjMgMCAwIDEgNTkgMzUwLjhjLS44OS0xLjY2LTEuNjgtMy4zOC0yLjU2LTUuMDVhNDAuNjcgNDAuNjcgMCAwIDAtMi42NS00LjY5IDU3LjcyIDU3LjcyIDAgMCAxLTUtOS4xOWMtLjYxLTEuMjYtMS4yOC0yLjQ4LTEuOTEtMy43My0xLjc1LTMuNDQtMy43LTYuNzktNC41OC0xMC42M2ExOS4yNCAxOS4yNCAwIDAgMC0xLjUzLTMuNTEgMzAuNTUgMzAuNTUgMCAwIDEtMS4yNi0zYy0uNy0yLjE2LTEtNC40Ni0yLjUtNi4zMmE1LjA3IDUuMDcgMCAwIDEtLjYzLTEuNjZjLTEuMS0zLjI5LTIuMjEtNi41OC0zLjI5LTkuODgtLjM3LTEuMTQtLjY3LTIuMy0xLTMuNDYtMS4zMi00LjktMi45My05LjczLTMuNjMtMTQuNzktLjExLS43OC0uMjEtMS41Ny0uMjYtMi4zN2ExOC40IDE4LjQgMCAwIDAtLjc3LTQuNzEgMTIuMjYgMTIuMjYgMCAwIDEtLjQ2LTIuNjRjLS4yNi0yLjY3LS40Ni01LjM1LS42OC04YTIuMjcgMi4yNyAwIDAgMC0uMDktLjU5IDE3LjcyIDE3LjcyIDAgMCAxLTEtNy42NGMwLS4wNy0uMTEtLjE2LS4yNy0uNC0xLjg3LS40NC0zLjg4LTEtNS45LTEuMzgtNS43NS0xLjIxLTExLjUtMi4zNy0xNy4yNS0zLjU2LTEuMzctLjI4LTEuNzEtLjYyLTEuNzYtMmE4LjE1IDguMTUgMCAwIDEgLjE4LTIuMzcgMTguNDUgMTguNDUgMCAwIDAgLjYyLTggNS4zOSA1LjM5IDAgMCAxIC4xOC0yLjQxYy44NS0yLjgyLjgyLTUuNzMgMS04LjYxYTc5LjkzIDc5LjkzIDAgMCAxIDEuOC0xMC45Yy42Mi0zLjIxLjgtNi41MiAyLjEyLTkuNTdhMzAuMjUgMzAuMjUgMCAwIDEgMy41My0xMS42MiA3Ljg0IDcuODQgMCAwIDAgLjg3LTMuNDIgMTIuMDUgMTIuMDUgMCAwIDEgMS44LTUuOTMgMjguMzYgMjguMzYgMCAwIDAgMi43MS01LjkyYy44NS0yLjUyIDEuODYtNSAyLjk0LTcuNDdhMTA3LjQgMTA3LjQgMCAwIDEgNS41Ni0xMC4yMSAyNy42NCAyNy42NCAwIDAgMSAyLjM3LTMuMDcgNS4yOCA1LjI4IDAgMCAwIC43MS0xYzEuNTItMy41IDMuODUtNi40OSA1Ljk1LTkuNjJhMjYuMDcgMjYuMDcgMCAwIDEgMS45NC0yLjYyYzEuNDQtMS42NSAzLTMuMjQgNC40My00Ljg2YTMuNDEgMy40MSAwIDAgMCAuNzMtLjk0Yy44Ni0yLjE1IDIuNTgtMy41MiA0LjMxLTQuODdhMTMuNSAxMy41IDAgMCAwIDIuNDktMi44OSAzOS4xNyAzOS4xNyAwIDAgMSA0LjQ5LTQuNzJjLjg1LS44NCAxLjkzLTEuNDUgMi43Mi0yLjM0YTM1LjU5IDM1LjU5IDAgMCAxIDUtNC4yOWMyLTEuNiA0LjE0LTMuMTMgNi00LjlhMzQuODUgMzQuODUgMCAwIDEgOC42My01LjhjLjI3LS4xMy42Mi0uMjQuNzQtLjQ3LjktMS42MyAyLjUtMi4yIDQuMDgtMi44M2E0Ljg5IDQuODkgMCAwIDAgMS41NS0uOWMxLjg4LTEuNzkgNC4zMy0yLjM4IDYuNjYtMy4yNGExMy45MSAxMy45MSAwIDAgMCA1LTIuNiA0Ljg2IDQuODYgMCAwIDEgMS41NS0uODkgNTUuMSA1NS4xIDAgMCAwIDcuODItMy41NyAxOS4zMSAxOS4zMSAwIDAgMSA2LjIzLTIgNC4xMyA0LjEzIDAgMCAwIDIuNDItMSA0LjY4IDQuNjggMCAwIDEgMy0xLjI0IDE1Ljc2IDE1Ljc2IDAgMCAwIDYuNTUtMS44NSA1LjY5IDUuNjkgMCAwIDEgMi41LS42NiAzNi40IDM2LjQgMCAwIDAgOC44LTEuNjEgMy4xMiAzLjEyIDAgMCAxIC44Ny0uMmMyLjg0LjE3IDUuNDUtMS4xMSA4LjI0LTEuMjlhMzMuNTMgMzMuNTMgMCAwIDAgMy44My0uNjggMTEuMTYgMTEuMTYgMCAwIDAgLjQxLTEuNTdjLjI1LTIuMzggMS4yOC00LjU1IDEuODgtNi44NGExNy40MSAxNy40MSAwIDAgMCAuNTEtMS43Yy44NS01LjQ3IDIuODktMTAuNTEgNS0xNS42MXM0LjY1LTkuOTEgNi44OS0xNC44OWEzLjU5IDMuNTkgMCAwIDEgLjYxLTFjMS44Ni0xLjg5IDIuODItNC4zMiA0LjA5LTYuNTdhOS4xNSA5LjE1IDAgMCAxIDEuNTYtMi4xNyAxOC4zMiAxOC4zMiAwIDAgMCA0LTUuMTYgMTYuODQgMTYuODQgMCAwIDEgMi40Ny0zLjcxcTQuMjktNC43OSA4Ljc0LTkuNDFjMS4xLTEuMTUgMi4zNy0yLjEzIDMuNTctMy4xOSAxLS44NSAyLTEuNjYgMi44OS0yLjU1QzE4Ny4xMyAyLjM0IDE4OC42Ni43NiAxOTEgMGE1LjcgNS43IDAgMCAxIDMuMSAyLjMyYzIuMDkgMy4wOCA0LjgyIDUuNTggNy4zOSA4LjIzcTMuNDMgMy41NCA2Ljc5IDcuMThhMTQgMTQgMCAwIDEgMS4xOCAxLjcxIDQuNTcgNC41NyAwIDAgMS0xLjgzIDNjLTEuMyAxLjA3LTIuNTggMi4xOS0zLjg4IDMuMjdhMy4zOCAzLjM4IDAgMCAxLTEuMjEuODZjLTEuNTkuMzMtMi40OCAxLjU1LTMuNTUgMi41OS0xLjkzIDEuODctMy41MiA0LjA3LTUuOCA1LjU5YTcgNyAwIDAgMC0xLjU5IDEuNzggMjAuMiAyMC4yIDAgMCAxLTMuMzkgMy43NyA2LjkyIDYuOTIgMCAwIDAtMS41OSAyLjE1IDExMi4xNSAxMTIuMTUgMCAwIDEtNS45MSA5LjY4IDM5LjQyIDM5LjQyIDAgMCAwLTMuOTEgNy43MmMtLjE0LjM3LS4xNS45MS0uNDEgMS4xLTEuOTMgMS4zOS0xLjc4IDMuNjctMi40NSA1LjU4YTI3LjA2IDI3LjA2IDAgMCAxLTIuMjcgNS44Yy0xIDEuNjktLjgzIDMuODItMS4xMyA2IDItLjI0IDMuNzMuMzQgNS40OC0uMzNhMi4yIDIuMiAwIDAgMSAuOTggMGMzLjA3LjE2IDYuMTYuMTkgOS4yMi41NCAzLjg1LjQ1IDcuNjcgMS4xNSAxMS41IDEuNzdhMTIuMDcgMTIuMDcgMCAwIDEgMS43LjU2IDEyLjA4IDEyLjA4IDAgMCAwIDIuODQuODggMTkuNDMgMTkuNDMgMCAwIDEgNy43NCAyIDMuMjIgMy4yMiAwIDAgMCAxLjE4LjE1IDMuNzUgMy43NSAwIDAgMSAuODkgMCAyNSAyNSAwIDAgMCA0Ljc1IDEuNjQgMTMuMzIgMTMuMzIgMCAwIDEgNC40NyAxLjUzYzIuNDYgMS4zMSA0Ljk0IDIuNTggNy40NCAzLjgzYTE1LjcyIDE1LjcyIDAgMCAwIDIgLjcxIDIwLjQ2IDIwLjQ2IDAgMCAxIDYuNDMgMy4xIDExLjkzIDExLjkzIDAgMCAwIDEuODMgMWMuOTQuNTQgMS45MiAxIDIuODEgMS42N2E0LjY4IDQuNjggMCAwIDAgMi4xMiAxIDUuNzcgNS43NyAwIDAgMSAyLjg0IDEuNTRjMi45MiAyLjM5IDUuOTIgNC43IDguODkgNyAuMzEuMjUuNi42MyAxIC43IDIuMzkuNDcgMy45NCAyLjIyIDUuNzMgMy42My40Ni4zNyAxIC41OCAxLjUuOTRhMTUuMzQgMTUuMzQgMCAwIDEgMi43NyAyLjI2IDQ5LjY0IDQ5LjY0IDAgMCAwIDUuMzQgNS4yMmMxLjE4IDEuMDYgMi4yNiAyLjIzIDMuMzQgMy4zOWExOS4wNSAxOS4wNSAwIDAgMCAzLjMgMyAyLjM3IDIuMzcgMCAwIDEgLjY3LjU5YzIuNDQgMy40MSA1LjQ1IDYuMzMgOC4yMiA5LjQ1YTEwLjQ3IDEwLjQ3IDAgMCAxIDEgMS40NmMxLjI2IDIgMi41IDQuMDggMy43NSA2LjEyYTIuMTcgMi4xNyAwIDAgMCAuNTMuNzFjMyAxLjgyIDQgNS4wNiA1Ljc0IDcuODMuMjYuNDIuMzYuOTQuNjQgMS4zNGE0Mi4yMSA0Mi4yMSAwIDAgMSA0Ljc5IDkuMjcgMy42IDMuNiAwIDAgMCAuNzIgMS4zYzIuNjkgMi43NSAzLjY1IDYuMzYgNC44OSA5LjgyYTIxLjkxIDIxLjkxIDAgMCAwIDEuNDIgMy41NSAyMiAyMiAwIDAgMSAxLjg4IDVjLjYyIDIuMjEgMS4xMSA0LjQ1IDEuNTcgNi43YTE0LjU0IDE0LjU0IDAgMCAwIDEuMTYgMy4zNmMuODQgMS43OCAxLjkyIDMuNTQgMS43IDUuNjZhMi4yOCAyLjI4IDAgMCAwIC4xNC44OSAzMi4xNCAzMi4xNCAwIDAgMSAxLjQ5IDkuNjljMCAuNjkuMjcgMS4zNy4zMyAyLjA3LjEzIDEuMzguMiAyLjc3LjI5IDQuMTZhMy4wOSAzLjA5IDAgMCAwIDAgLjZjLjU3IDIuMjQuMzEgNC41NC41NCA2LjhhMTguNTYgMTguNTYgMCAwIDEgLjEgNS4wNSAzOC44MSAzOC44MSAwIDAgMC0uMTkgNC4xOWMtLjE3IDIuNDctLjM4IDQuOTQtLjYgNy42NS0yLjM3IDEuNDctNC45IDMtOCAzYTIuODYgMi44NiAwIDAgMC0uODguMTZjLTUuODggMi4xMi0xMi4wOSAyLjQ3LTE4LjE4IDMuNDJhMTkuNzEgMTkuNzEgMCAwIDEtNS4zMi4xNyA0My40NyA0My40NyAwIDAgMC02LjU0LjIyIDE5LjggMTkuOCAwIDAgMS01Ljk0LS4zMyAxNS44MiAxNS44MiAwIDAgMC00LjQ2LS4yNmMtMi4yLjA2LTQuMzcuMjctNi40OC0uNTlhNS42OSA1LjY5IDAgMCAwLTEuMTgtLjE2Yy0yLjcxLS4zNy01LjU5IDAtOC0xLjcxLS4xMy0uMS0uMzkgMC0uNTkgMGEyNS4xMyAyNS4xMyAwIDAgMS02LjQyLTEuMTEgMTM2Ljc4IDEzNi43OCAwIDAgMS0xNS4zLTUuMTMgNTQuMTkgNTQuMTkgMCAwIDAtNi4zNi0yLjUxIDEuNSAxLjUgMCAwIDEtLjU1LS4yM2MtMy40OC0yLjc2LTcuODctMy43Ni0xMS42MS02LTIuMzctMS40Ni00LjU3LTMuMTctNy00LjU2LTMuNzMtMi4xNi02LjczLTUuMjgtMTAuMjYtNy43MWE4Ni4xMyA4Ni4xMyAwIDAgMS04Ljg1LTcuMDljLTIuNDMtMi4xOS01LTQuMjktNi44My03LjA4YTE2IDE2IDAgMCAwLTEuNzItMS42N2MtMS40Ni0xLjYyLTMuMS0zLjA5LTQtNS4xNWE1LjkyIDUuOTIgMCAwIDAtMS4xOC0xLjM0Yy0xLjg5LTIuMTYtMy44OC00LjI0LTUuMDctNi45My0uMjItLjQ5LS44OC0uNzgtMS4yMi0xLjI1YTY5LjE2IDY5LjE2IDAgMCAxLTQuMy02LjFjLTIuMjktNC00LjU3LTcuOTQtNi40Ni0xMi4wOS0xLjQ0LTMuMTUtMy4yMi02LjE1LTQuMi05LjU1LS44MS0yLjg1LTIuMzEtNS41LTMuNS04LjI0YTQuNjIgNC42MiAwIDAgMS0uNi0xLjY3YzAtMi40Ni0xLjA1LTQuNTctMS44NC02LjgxYTQ3LjQ2IDQ3LjQ2IDAgMCAxLTIuODItMTEuOWMwLS40OS0uMi0xLS4yOS0xLjQ2cS0uNjMtMy41Mi0xLjI0LTdhMS4wNyAxLjA3IDAgMCAxIDAtLjU5Yy44Ni0xLjcyIDAtMy4zLS4zNC00LjkzYTE5LjExIDE5LjExIDAgMCAxLS40OS01IDI3LjQgMjcuNCAwIDAgMC0uNzgtOC42Mm0yNy41NC4zOWExMS44IDExLjggMCAwIDAtLjUzIDQuOTNjLjE5IDIuNTkuMTQgNS4yMS41NyA3Ljc2LjcxIDQuMzIuNTcgOC43NyAyIDEzIC41NCAxLjYzLjQgMy4zNi44MSA1YTg0LjU2IDg0LjU2IDAgMCAwIDQuOTUgMTQuNDEgNTguMzggNTguMzggMCAwIDEgMi4zNSA2LjE0IDYuNTcgNi41NyAwIDAgMCAuOCAxLjg1Yy45MSAxLjMgMS42NCAyLjczIDIuNDQgNC4xLS4yNSAxLjc5IDEuMSAyLjg5IDEuODUgNC4yNC4zOS43LjkzIDEuMzEgMS4yNSAyYTM4LjQ1IDM4LjQ1IDAgMCAwIDQuMjYgNi42NmMyLjMxIDMuMjMgNC44OCA2LjI5IDcuMzMgOS40M2EzLjU2IDMuNTYgMCAwIDEgLjcxIDFjLjY0IDEuOTEgMi4yIDMuMDUgMy41NyA0LjM0IDEuODkgMS43NiAzLjkgMy40MSA1LjIyIDUuNzFhMy4xOSAzLjE5IDAgMCAwIC44MS44M2MyLjg3IDIuMzEgNS43NSA0LjYgOC42MyA2LjlhMTI3Ljc1IDEyNy43NSAwIDAgMCAxNS4xNCAxMC4xYzMuMDkgMS44IDYuNSAzIDkuMzggNS4yYTYuMTEgNi4xMSAwIDAgMCAxLjY4LjYxIDI4LjA3IDI4LjA3IDAgMCAxIDQuMjIgMS40OCAxMi40MSAxMi40MSAwIDAgMCAzLjg3IDEuNDggOC4xOCA4LjE4IDAgMCAxIDEuNjIuNyAxMyAxMyAwIDAgMCAxLjg5LjgxYzEuNzQuNDMgMy41Ljg0IDUuMjYgMS4xNSAyLjk1LjUxIDUuOSAxLjA4IDguODcgMS4zNSAyLjI3LjIgNC40MyAxIDYuNzYuOTIgMy0uMDkgNS45Ljc3IDguOTIuMzNhMTIuMjYgMTIuMjYgMCAwIDEgNS4wNS0uMTIgNC41NSA0LjU1IDAgMCAwIDEuNDctLjE4IDYuOTEgNi45MSAwIDAgMSAyLjA2LS4xNCA1LjExIDUuMTEgMCAwIDAgNC0uODggMTAuNzEgMTAuNzEgMCAwIDAgMC0xLjVBMzEgMzEgMCAwIDEgMjk1IDIxNGE1LjM2IDUuMzYgMCAwIDAtLjEyLTEuNDljLS42Mi0zLjUzLTEuMjItNy4wNi0xLjkzLTEwLjU3LS40Ny0yLjM1LTEuMDYtNC42Ny0xLjY1LTctLjMyLTEuMjYtLjczLTIuNDktMS4xMi0zLjczYTY2LjA2IDY2LjA2IDAgMCAwLTMuNzgtMTAuMzggMy40NCAzLjQ0IDAgMCAxLS41Mi0xLjM4IDUuNjUgNS42NSAwIDAgMC0xLTIuNzZjLTItMy42OC00LjA3LTcuMzItNi0xMWEyNS4zMiAyNS4zMiAwIDAgMC0zLjE5LTUgMTUuMzIgMTUuMzIgMCAwIDEtMS44MS0yLjM3Yy0yLTMuNDktNC42MS02LjUtNi44Ni05Ljc5YTEyIDEyIDAgMCAwLTMuMjMtMy40NCA5LjY2IDkuNjYgMCAwIDEtMi41NS0yLjUxYy0yLjMzLTMuMy01LjYtNS42NS04LjQyLTguNDYtMS43NS0xLjczLTMuODYtMy4wOC01LjcxLTQuNzUtMi4wNi0xLjg0LTQuMzEtMy41Mi02LjQ5LTUuMjRhNDcuMDkgNDcuMDkgMCAwIDAtNC40Ny0zYy00LjMtMi42OC04LjQxLTUuNjktMTMuMTYtNy42YTkgOSAwIDAgMS0zLjg3LTIuMiAxLjQzIDEuNDMgMCAwIDAtLjc3LS40NCAzMi4wOSAzMi4wOSAwIDAgMS04LjM1LTMuMTFjLS4yNi0uMTMtLjU4LS4xMy0uODYtLjI0YTQuMjUgNC4yNSAwIDAgMS0xLjM1LS42IDcuMTQgNy4xNCAwIDAgMC0zLjMxLTEuMjYgNzIuNTkgNzIuNTkgMCAwIDEtOC42NS0yLjJjLTIuMS0uNzUtNC41Mi0uNTMtNi42MS0xLjU2LTMuNjkgMC03LjMzLS44Mi0xMS0uNTJhMjAuODggMjAuODggMCAwIDEtNC40NyAwIDE0Ljg2IDE0Ljg2IDAgMCAwLTUuNTEuMzgiLz48L3N2Zz4=";

export default create({
  base: "light",
  brandTitle: "Oak National Academy",
  brandUrl: "https://www.thenational.academy",
  brandImage: logoBase64,
});