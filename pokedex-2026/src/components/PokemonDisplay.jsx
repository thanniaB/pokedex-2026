export const PokemonDisplay = ({pokemon}) => {
    if(!pokemon) {
        return(
            <div>
                Nada que mostrar.
            </div>
        );
    }

    const {name, types, hp, attack, defense, specialAttack, specialDefense, speed, spriteUrl} = pokemon;

    return (
        <div>
            <img src={spriteUrl} alt={`${name} sprite`} />
            <h2>
                {name}
            </h2>
            <div>{types.join(" ")}</div>
            <table>
                <tr>
                  <td>HP: </td>
                  <td>{hp}</td>  
                </tr>
                <tr>
                  <td>Attack: </td>
                  <td>{attack}</td>  
                </tr>
                <tr>
                  <td>Defense: </td>
                  <td>{defense}</td>  
                </tr>
                <tr>
                  <td>Special Attack: </td>
                  <td>{specialAttack}</td>  
                </tr>
                <tr>
                  <td>Special Defense: </td>
                  <td>{specialDefense}</td>  
                </tr>
                <tr>
                  <td>Speed: </td>
                  <td>{speed}</td>  
                </tr>
            </table>
        </div>

    );
}