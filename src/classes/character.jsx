import Draggable from "react-draggable";

export default class Character {
    name;
    img;
    maxHp;
    isNpc;
    status;
    currentHp;

    constructor({ name, img, maxHp, isNpc, isEnemy }) {
        this.name = name;
        this.img = img;
        this.maxHp = maxHp;
        this.isNpc = isNpc;
        this.isEnemy = isEnemy;
        this.currentHp = maxHp;
    }

    // dashboard box (detailed info)
    sideBox(i) {
        const hpBarPercent = this.currentHp / this.maxHp;
        const getBgColor = (val) => {
            // start: 20, 247, 20
            // middle: 247, 247, 20
            // end: 247, 20, 20
            const startVal = 20;
            const endVal = 247;

            const rVal = (1 - Math.max((val - .5) / .5, 0)) * (endVal - startVal) + startVal;
            const gVal = Math.min(val / .5, 1) * (endVal - startVal) + startVal;
            const bVal = startVal;

            return `#${Math.round(rVal).toString(16)}${Math.round(gVal).toString(16)}${Math.round(bVal).toString(16)}`;
        }

        return <div key={i} className="side-box">
            <img src={this.img} />
            <div className="name-hp-container">
                <h2>
                    {this.name}
                </h2>
                <div>
                    <div className="hp-bar-outer">
                        <div style={{ width: `${(hpBarPercent * 95)}%`, backgroundColor: getBgColor(hpBarPercent) }} className="hp-bar" />
                    </div>
                    <p>{this.currentHp} / {this.maxHp}</p>
                </div>
            </div>
        </div>
    }

    get borderColor() {
        let color = "#14f714";

        if (this.isNpc) {
            color = "#f7f714";
        }

        if (this.isEnemy) {
            color = "#f71414";
        }

        return color;
    }

    // small circle that appears on map (in grid)
    mapIcon(w) {
        return <Draggable isPlayer={!(this.isNpc || this.isEnemy)} name={this.name}>
            <div className="map_icon">
                {/* prevent ghost img by setting draggable to false on img tag */}
                <img src={this.img} draggable="false" style={{ borderColor: this.borderColor, width: w, height: w }} id={this.name} />
            </div>
        </ Draggable>;
    }
}