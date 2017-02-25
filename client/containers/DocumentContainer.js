import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentAction from '../actions/documentAction';
import DocumentForm from '../components/DocumentForm';
import DocumentMarkdown from '../components/DocumentMarkdown';

class DocumentContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			document: Object.assign({}, this.props.document),
			error: {},
			saving: false
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.updateDocumentState = this.updateDocumentState.bind(this);
		this.handleEditorchange = this.handleEditorchange.bind(this);
	}

	updateDocumentState(event) {
		const field = event.target.name;
		let document = this.state.document;
		document[field] = event.target.value;
		return this.setState({ document: document });

	}

	handleFormSubmit(event) {
		event.preventDefault();
		this.props.saveDocument(this.state.document)
		this.setState({ saving: true });
	}

	handleEditorchange(event) {
		let content
		let document = this.state.document;
		document.content = event.target.getContent({ format: 'raw' });
		return this.setState({ document: document });
	}

	componentDidMount() {
		this.props.fetchDocuments();
	}
	render() {
		return (
			<div className="container">
				<DocumentForm
					document={this.state.document}
					onChange={this.updateDocumentState}
					onSave={this.handleFormSubmit}
					errors={this.state.error} />

				<DocumentMarkdown
					document={this.state.document}
					onChange={this.handleEditorchange} />

				<center>
					<button type='submit' name='btn_login'
						className='col s12 btn btn-large waves-effect indigo'
						onClick={this.handleFormSubmit}>Add Document
        </button>
				</center>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
		saveDocument: (document) => dispatch(documentAction.saveDocument(document))
	}
}

const mapStateToProps = (state, ownProps) => {
	let document = { title: "", content: "", access: "", userId: "" }
	return {
		documents: document
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);