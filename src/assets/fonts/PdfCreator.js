import React, { Component } from 'react'
// import { BlobProvider,PDFDownloadLink,PdfDocument, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { BlobProvider, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { connect } from 'react-redux'
import Utils from '../../../../src/components/Utils'
import ReduxActions from '../../../../src/components/ReduxActions'
// import theFont from '../../../assets/fonts/Taviraj-Light.ttf'

import Cookies from 'universal-cookie'

import {
  Button,
} from 'reactstrap'
// import Fetcher from '../../../fetcher'
// import Labels from '../../../Labels'

// Font.register({ family: 'Taviraj', src: theFont })
// Font.register(theFont, { fontFamily: 'Taviraj' });
// Font.register(theFont, {
//   family: 'Taviraj',
//   weight: '100,200,300',
// })

// Font.register({ family: 'Roboto', src: source });
// Font.register({ family: 'Kanit', src: 'http://fonts.gstatic.com/s/mitr/v4/pxiLypw5ucZF-Tw4NLr8f1s.ttf' })


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Taviraj: {
    normal: 'Taviraj-Light.ttf',
    bold: 'Taviraj-Bold.ttf',
    italics: 'Taviraj-Italic.ttf',
    bolditalics: 'Taviraj-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Sukhumvit: {
    normal: 'SukhumvitSet-Text.ttf',
    bold: 'SukhumvitSet-Bold.ttf',
    italics: 'SukhumvitSet-Thin.ttf',
    bolditalics: 'SukhumvitSet-Medium.ttf'
  }
}


const cookies = new Cookies()
// const fetcher = new Fetcher()

// Create styles
// const pdfStyles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//     width: '100%',
//   },
//   title: {

//   }
// })

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={pdfStyles.page}>
//       <View style={pdfStyles.section}>
//         <Text style={pdfStyles.title}>ใบแจ้งซ่อม</Text>
//         <Text>รายละเอียดผู้แจ้งเรื่อง</Text>
//         <Text>รายละเอียดการเสียของอุปกรณ์</Text>
//       </View>
//     </Page>
//   </Document>
// )

// const FixDocument = (dataRender) => (
//   <Document>
//     <Page size="A4" style={pdfStyles.page}>
//       <View style={pdfStyles.section}>
//         <Text>{'abcdefghijklmnopqrstuvwxyz'}</Text>
//         <Text style={pdfStyles.title}>ใบแจ้งซ่อม</Text>
//         <Text>{'รายละเอียดผู้แจ้งเรื่อง'}</Text>
//         <Text>{'รายละเอียดการเสียของอุปกรณ์'}</Text>
//       </View>
//     </Page>
//   </Document>
// )

class PdfCreator extends Component {
  constructor(props) {
    super(props)
    // console.log('in PdfCreator')
    this.state = {
      loginCookie: cookies.get(process.env.REACT_APP_CK_DATA),
      VAL_01_01: 'a',
      VAL_01_02: 'b',
      VAL_01_03: 'c',
      VAL_01_04: 'd',
      VAL_02_01: 'e',
      VAL_02_02: 'f',
      VAL_02_03: 'g',
      VAL_02_04: 'h',
      VAL_02_05: 'i',
      VAL_02_06: 'j',
      VAL_02_07: 'k',
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(ReduxActions.stampGeneralLog('On Page PdfCreator'))
  }


  printPDF() {

    var docDefinition = {
      header: {
        columns: [
          { text: { text: 'ใบแจ้งซ่อม ', fontSize: 16 }, alignment: 'center',style:{
            padding: '30px',
          }}
        ],
      },
      // footer: {
      //   columns: [
      //     'Left part',
      //     { text: 'Right part', alignment: 'right' }
      //   ]
      // },
      content: [
        { text: 'รายละเอียดผู้แจ้งซ่อม', fontSize: 10 },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'ผู้แจ้งปัญหา'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_01_01,
            },
            {
              // % width
              width: '30%',
              text: ''
            },
            {
              // % width
              width: '20%',
              text: ''
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'หน่วยงาน/แผนก'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_01_02,
            },
            {
              // % width
              width: '30%',
              text: ''
            },
            {
              // % width
              width: '20%',
              text: ''
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'เบอรืติดต่อ'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_01_03,
            },
            {
              // % width
              width: '30%',
              text: ''
            },
            {
              // % width
              width: '20%',
              text: ''
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'E-Mail ผู้แจ้งปัญหา'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_01_04,
            },
            {
              // % width
              width: '30%',
              text: ''
            },
            {
              // % width
              width: '20%',
              text: ''
            },
          ],
          columnGap: 10
        },
        { text: 'รายละเอียดการเสียของอุปกรณ์', fontSize: 10 },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'ผู้รับผิดชอบ'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_02_01
            },
            {
              // % width
              width: '30%',
              text: 'ชื่ออุปกรณ์'
            },
            {
              // % width
              width: '20%',
              text: this.state.VAL_02_02,
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'รายละเอียดปัญหาอุปกรณ์'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_02_03,
            },
            {
              // % width
              width: '30%',
              text: 'รายละเอียดอุปกรณ์'
            },
            {
              // % width
              width: '20%',
              text: this.state.VAL_02_04,
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: 'วัน/เวลา ที่เกิดเหตุการณ์'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: this.state.VAL_02_05,
            },
            {
              // % width
              width: '30%',
              text: 'สถานที่เกิดเหตุการณ์'
            },
            {
              // % width
              width: '20%',
              text: this.state.VAL_02_06,
            },
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '30%',
              text: ''
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '20%',
              text: '',
            },
            {
              // % width
              width: '30%',
              text: 'เลขที่อุปกรณ์ (S/N)'
            },
            {
              // % width
              width: '20%',
              text: this.state.VAL_02_07,
            },
          ],
          columnGap: 10
        },
      ],
      defaultStyle: {
        font: 'Taviraj',
      },
    };
    pdfMake.createPdf(docDefinition).open()

  }

  render() {
    // return (<PDFDownloadLink >
    //   {MyDocument()}
    // </PDFDownloadLink >)
    // return (<PDFDownloadLink
    //   document={MyDocument()}
    //   fileName="example.pdf"
    //   target="_blank"
    // >
    //   {({ blob, url, loading, error }) =>
    //     loading ? "Loading document..." : "Download Pdf"
    //   }
    // </PDFDownloadLink>)

    // return (<BlobProvider document={FixDocument()}>
    //   {({ url }) => (
    //     <a href={url} className="btn btn-info" target="_blank" rel="noopener noreferrer"><i className="fa fa-print" /></a>
    //   )}
    // </BlobProvider>)
    return (<Button onClick={()=>this.printPDF()} className="mr-2 mb-2 btn btn-info btn-sm" target="_blank" rel="noopener noreferrer"><i className="fa fa-print" /></Button>)
  }
}

const AppWithConnect = connect(
  Utils.mapStateToProps,
  null,
  Utils.mergeProps
)(PdfCreator)
export default AppWithConnect
