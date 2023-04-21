import { css } from 'uebersicht'

export const command = 'system_profiler SPHardwareDataType'

export const refreshFrequency = 600000

const container = css `
  position: fixed;
  /* Add some space to bottom to make room for your Dock. */
  bottom: 20px;
  left: 20px;

  display: table-row;
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');
  font-size: 30pt;
  font-family: 'EB Garamond', serif;
  font-weight: 300;
  line-height: 1em;
`

const imagey = css `
  display: table-cell;
  margin: 0;
  padding: 0;
`

const texty = css`
  display: table-cell;
  margin: 0;
  padding: 0 .5em;
  background: #E5E1E6;
  border: 2px solid #E5E1E6;
  border-style: outset;
  border-radius: .25em;
  vertical-align: middle;
  color: black;
  transform: scale(.9,1);
  filter:
    drop-shadow(1px 1px 1px rgb(240,240,240, .5))
    drop-shadow(-1px -1px 1px rgb(60, 60, 60, .5))
  ;
`

const logo = css`
  height: 55px;
  width: 55px;
  margin: 0;
  filter:
    drop-shadow(1px 1px 1px rgb(240,240,240, .5))
    drop-shadow(-1px -1px 1px rgb(60, 60, 60, .5))
  ;
`

export const render = ({ output }) => {

  var systemName = 'Power Macintosh 21000';
  
  if (output) {
    var newLine   = "\n";
    var space     = " ";
    var modelCode = '';
    var modelName = 'Power Macintosh'
    var processor = 'G7';
    var memory    = 16;
    var cores     = 0;
    var working = '';
    var pos = 0;
    
    // extract the various elements from the text
    pos = output.indexOf('Model Name: ');
    if (pos) {
      pos += 12;
      modelName = output.substr(pos, output.indexOf(newLine, pos) - pos);
    }
    
    // memory
    pos = output.indexOf('Memory: ');
    if (pos > 0) {
      pos += 8;
      working = working = output.substr(pos, output.indexOf(newLine, pos) - pos);
      pos = working.indexOf(' GB');
      memory = working.substring(0, pos);
    }
    // determine if this is an Intel or Apple Silicon mac
    pos = output.indexOf('Chip: ');
    if (pos > 0) {
      pos += 6;
      working = output.substr(pos, output.indexOf(newLine, pos) - pos);
      processor = working.replace('Apple ', '');
      
      pos = output.indexOf('Cores: ') + 7;
      cores = output.substr(pos, output.indexOf(space, pos) - pos);
      processor += ' ' + cores;
    }
    else {
      // this must be an intel box
      // use the processor speed and number of cores to make up the model number
      pos = output.indexOf('Processor Name: ');
      if (pos > 0) {
        pos += 16;
        
        // extract the number of cores
        working = output.substr(pos, output.indexOf(newLine, pos) - pos);
        pos = working.indexOf('-Core');
        cores = working.substr(0, pos);
        working = working.replace(cores, '').replace('-Core ', '').replace('Intel ', '');
        
        // extract the CPU speed
        pos = output.indexOf('Processor Speed: ') + 17;
        working = output.substr(pos, output.indexOf(newLine, pos) - pos);
        pos = working.indexOf(' GHz');
        var speed = working.substr(0, pos);

        // multiply by 100 and accept JS’ string concatenation 🤷🏻‍♂️
        processor = speed * 100 + cores;
      }
    }
    // assemble as a vintagey name
    systemName = modelName + ' ' + processor + '/' + memory;
  }

  return (
    <div className={container}>
      <div className={imagey}><img className={logo} src="/vintage-apple.widget/AppleLogo1977.png" alt=""/></div>
      <div className={texty}>{systemName}</div>
    </div>
  )
}