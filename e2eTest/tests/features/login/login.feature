Feature: Test de prueba de home de Swag Labs

    @smoke @loginSauce
    Scenario Outline: Scenario Outline name: Prueba de la Home de SauceDemo
        Given El usuario se encuentra en la home page
        When El usuario ingresa Usuario "<username>" y Password "<password>"
        Then El usuario se encuentra logueado

    Examples:
     | username       | password      |
     | standard_user  | secret_sauce  |

        