import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles



  return (
    <div style={{ direction: "rtl", minHeight: "11vh"}}>
      <br-x />
      <Window title={"قیمت لحظه ای تتر (Tether)"} style={{ minHeight: 420, margin: 10, width: "calc(100% - 20px)",backgroundColor:"lavender"}}>


        <div style={{padding:"20px"}}>

          <div style={{ float: "right", height: 300, width: 250, backgroundColor: "white", border: "2px slateblue solid", borderRadius: 10, marginRight: "15%", marginTop: "3%", textAlign: "center" }}>

            <h1 style={{ padding:'20px', color: "rgb(54 149 237)", fontSize: 15, fontWeight: "bolder", textAlign: 'center' }}>

              نرخ مبادله دلار


            </h1>
            
            <hr style={{margin:"0 auto", width: "70%", opacity: 0.2 }}/>


            <h2 style={{ marginTop: 25, color: "rgb(82 14 116)", fontSize: 15, }}>

              قیمت لحظه ای:

              <span style={{ color: "rgb(129 11 240)" }}>

                {"ت " + (props.p.price as number).toLocaleString("fa-IR")}

              </span>


            </h2>


            <h2 style={{ marginTop: 40, color: "rgb(82 14 116)", fontSize: 15, }}>

              تغییرات ۲۴ ساعت:

              <span style={{ color: "rgb(6 76 255)" }}>

                {"٪" + (Number(props.p.diff24d as number)).toLocaleString("fa-IR")}

              </span>

            </h2>


            <h2 style={{ marginTop: 40, color: "rgb(82 14 116)", fontSize: 15, }}>

              تغییرات هفتگی:

              <span style={{ color: "rgb(6 76 255)" }}>

                {"٪" + (Number(props.p.diff7d as number).toLocaleString("fa-IR"))}

              </span>

            </h2>


            <h2 style={{ marginTop: 40, color: "rgb(82 14 116)", fontSize: 15, }}>

              تغییرات ماهانه:
              <span style={{ color: "rgb(6 76 255)" }}>

                {"٪" + (Number(props.p.diff30d as number).toLocaleString("fa-IR"))}

              </span>

            </h2>



          </div>




          <div style={{ float: "left", height: 300, width: 250, backgroundColor: "white", border: "2px slateblue solid", borderRadius: 10, marginLeft: "15%", marginTop: "3%", textAlign: "center" }}>

            <h1 style={{ padding:"20px" , color: "rgb(54 149 237)", fontSize: 15, fontWeight: "bolder", textAlign: 'center' }}>

              Dollar's Exchange Rate

            </h1>

            <hr style={{margin:"0 auto", width: "70%", opacity: 0.2 }}/>


            <h2 style={{ marginTop: 25, color: "rgb(180 29 218)", fontSize: 15 }}>

              price:

              <span style={{ color: "rgb(129 11 240)" }}>
                {(props.p.price as number).toLocaleString("en-US") + " T"}
              </span>

            </h2>


            <h2 style={{ marginTop: 40, color: "rgb(180 29 218)", fontSize: 15 }}>

              Last 24h:

              <span style={{ color: "rgb(6 76 255)" }}>
                {(props.p.diff24d as number).toLocaleString("en-US")}%
              </span>

            </h2>


            <h2 style={{ marginTop: 40, color: "rgb(180 29 218)", fontSize: 15 }}>

              Last 7d:

              <span style={{ color: "rgb(6 102 255)" }}>
                {(props.p.diff7d as number).toLocaleString("en-US")}%
              </span>

            </h2>

            <h2 style={{ marginTop: 40, color: "rgb(180 29 218)", fontSize: 15 }}>

              Last 30d:

              <span style={{ color: "rgb(6 102 255)" }}>
                {(props.p.diff30d as number).toLocaleString("en-US")}%
              </span>


            </h2>

          </div>
          
        </div>
      </Window>

    </div >
      

  )

}



export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT

  console.log("priceeeee:", p)


  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}