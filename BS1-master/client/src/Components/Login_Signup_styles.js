import { makeStyles } from "@mui/styles";
import { Theme } from "./Theme";
//import imgbg from '../images/bgimg.jpg'
import bg from '../assests/bg1.jpg'

export const useStyles = makeStyles(() => ({

    signup:{
        backgroundColor: Theme.colors.bgColor,
        height : '92vh',
        width : '100%'
    },
    signup_left :{
        padding: '4rem !important',
        display:'flex',
        flexDirection: 'column !important',
        // background: Theme.colors.lightBlue,
        margin: '0 auto',
        
        position: 'relative',
        '&::before' : {
            content : '" "',
            backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: '0.3',
        position: 'absolute',
        top: '0',
  left: '0',
  bottom: '0',
  right: '0',

        }


        

    },
    signup_right :{
        padding: '2rem !important',

    },
    title: {
        fontWeight : 'bolder !important',
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '1rem',
        color: '#000000'

    },
    subtitle : {
        textAlign: 'center',
        fontWeight: '700 !important',
        paddingBottom : '1rem',
        color: '#000000'



    },
    btn:{
        margin: '0 auto'

    },
    button : {
        // color: `${Theme.colors.offWhite} !important`,
        color : 'white',
        background : Theme.colors.blueColor,
        padding: '4px 20px !important',
        borderRadius: '20px !important',
        borderColor: ` ${Theme.colors.blueColor} !important `,
        "&:hover " :{
            background : `${Theme.colors.blueColor} !important`,
            color: 'white !important',

        }
    },

    dark_btn : {
        display  : 'flex',
        justifyContent : "center",
        margin : '0, auto'
    },
    dark_button : {
        color: 'white !important' ,
        background : `${Theme.colors.blueColor} !important` ,
        padding: '4px 20px !important',
        borderRadius: '20px !important',
        borderColor: ` ${Theme.colors.blueColor} !important `,
        "&:hover " :{
            background : `${Theme.colors.lightBg} !important`,
            color: `${Theme.colors.blueColor} !important`,

        }

    },

    // floatingLabelFocusStyle: {
    //     color: Theme.colors.tealGreen
    // }


    root: {                           // - The TextField-root
        // border: 'solid 3px #0ff',     // - For demonstration: set the TextField-root border

        // (Note: space or no space after `&` matters. See SASS "parent selector".)
        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {              // - The <fieldset> inside the Input-root
                borderColor: 'default',   // - Set the Input border
            },
            '&:hover fieldset': {
                borderColor: 'default', // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                borderColor: Theme.colors.blueColor,
                background : "transparent"
            },


        },
    },

    form_label : {
        color: '#000',
    '&.Mui-focused': {
    //   color: 'yellow'
    }

    },

    validateError : {
        color : 'red ',
        fontSize : '12px '

    }


}))