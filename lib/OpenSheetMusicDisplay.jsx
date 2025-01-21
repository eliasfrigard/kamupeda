import React, { Component } from 'react';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';

class OpenSheetMusicDisplay extends Component {
    constructor(props) {
      super(props);
      this.state = { dataReady: false };
      this.osmd = undefined;
      this.divRef = React.createRef();
    }

    setupOsmd() {
      const options = {
        defaultColorMusic: this.props.defaultColorMusic !== undefined ? this.props.defaultColorMusic : '#000000',
        autoResize: this.props.autoResize !== undefined ? this.props.autoResize : true,
        drawTitle: this.props.drawTitle !== undefined ? this.props.drawTitle : true,
        drawSubtitle: this.props.drawSubtitle !== undefined ? this.props.drawSubtitle : true,
        drawLyricist: this.props.drawLyricist !== undefined ? this.props.drawLyricist : true,
        drawMetronomeMarks: this.props.drawMetronomeMarks !== undefined ? this.props.drawMetronomeMarks : true,
        drawPartNames: this.props.drawPartNames !== undefined ? this.props.drawPartNames : true,
        drawUpToMeasureNumber: this.props.drawUpToMeasureNumber !== undefined ? this.props.drawUpToMeasureNumber : undefined,
        drawComposer: this.props.drawComposer !== undefined ? this.props.drawComposer : true,
        backend: this.props.backend !== undefined ? this.props.backend : 'canvas',
      }
      this.osmd = new OSMD(this.divRef.current, options);
      this.osmd.load(this.props.file).then(() => this.osmd.render());
    }

    resize() {
      this.forceUpdate();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }

    componentDidUpdate(prevProps) {
      if (this.props.drawTitle !== prevProps.drawTitle) {
        this.setupOsmd();
      } else {
        this.osmd.load(this.props.file).then(() => this.osmd.render());
      }
      window.addEventListener('resize', this.resize)
    }

    // Called after render
    componentDidMount() {
      this.setupOsmd();
    }

    render() {
      return (<div ref={this.divRef} />);
    }
  }

  export default OpenSheetMusicDisplay;
