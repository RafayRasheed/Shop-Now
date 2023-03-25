import colors from "../uitls/colors";

const themes ={
    light:{
        primary:colors.primary,
        background:colors.whitesmoke,
        backgroundP:colors.white,

        text: colors.black,
        textL: colors.darkgrey,
        textC:colors.primary,

        iconBack:colors.lightblue,
        cardBack:colors.lightwhite,
        bodyBack:colors.lightw2,

        search: colors.gray,
        statusBar: colors.whitesmoke,
        searchBar: colors.white,

        shadow:colors.gray,
        danger:colors.danger,

        tabBarBack:colors.white,
        tabBarWid:colors.whitesmoke,

        devider:colors.lightgray

    },
    dark:{
        primary:colors.primaryD,
        background:colors.dark1,
        backgroundP:colors.black,

        text: colors.white,
        textL: colors.lightgray,
        textC:colors.primaryD,

        bodyBack:colors.dark2,
        cardBack:colors.dark3,
        iconBack:colors.lightblue,

        search: colors.lightgray,

        statusBar: colors.black,
        searchBar:colors.dark4,

        shadow:colors.lightgray,
        danger:colors.dangerD,

        tabBarBack:colors.dark1,
        tabBarWid:colors.dark3,

        devider:colors.dark4
    },
}
export default themes;