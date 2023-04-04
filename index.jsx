import { css } from "uebersicht"

export const command = 'system_profiler -json SPHardwareDataType'

export const refreshFrequency = false

const container = css `
  position: fixed;
  bottom: 10px;
  left: 20px;
  display: table-row;
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');
  font-size: 30pt;
  font-family: 'EB Garamond', serif;
  font-weight: 300;
`

const imagey = css `
  display: table-cell;
  margin: 0;
  padding: 0;
`

const texty = css`
  display: table-cell;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  color: black;
  transform: scale(.9,1);
`

const logo = css`
  height: 65px;
  width: 65px;
  margin: 0;
`

export const render = ({ output }) => {

  var data = JSON.parse(output);
  var modelCode = data.SPHardwareDataType[0].machine_model;
  var modelName = data.SPHardwareDataType[0].machine_name;
  var processor = data.SPHardwareDataType[0].chip_type;
  var memory    = data.SPHardwareDataType[0].physical_memory;

  // clean things up a bit
  processor = processor.replace('Apple ', '');
  memory = memory.replace(' GB', '');
  var systemName = modelName + ' ' + processor + '/' + memory;

  return (
    <div className={container}>
      <div className={imagey}><img className={logo} src="/vintage-apple.widget/AppleLogo1977.png" alt=""/></div>
      <div className={texty}>{systemName}</div>
    </div>
  )
}