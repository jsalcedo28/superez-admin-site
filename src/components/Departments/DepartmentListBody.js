import React from 'react';
import promiseDelay from 'promise-delay';
import notFound from '../../assets/img/notfound.png';
import { DepartmentListBodyListener } from '../../listeners/Departments/DepartmentListBodyListener';
import { DepartmentDetailModalBodyListener }
  from '../../listeners/Departments/DepartmentDetailModalBodyListener';
import { DepartmentDetailModalFooterListener }
  from '../../listeners/Departments/DepartmentDetailModalFooterListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class DepartmentListBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      copied: false,
      copiedDepartmentId: false,
      copiedEffect: false
    };

    DepartmentListBodyListener.setDepartmentsState =
      DepartmentListBodyListener.setDepartmentsState.bind(this);
  }

  componentDidMount() {
    fetch('https://api.getsuperez.com/departments')
      .then((response) => response.json())
      .then((data) => this.setState({ departments: data }));
  }

  handleGetDepartmentClick(departmentId) {
    const department = this.state.departments.filter(p => p._id === departmentId)[0];

    DepartmentDetailModalBodyListener.setDepartmentState(department);
    DepartmentDetailModalBodyListener.setImagesState([]);

    DepartmentDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkClick(departmentId) {
    const department = this.state.departments.filter(p => p._id === departmentId)[0];

    DepartmentDetailModalBodyListener.setDepartmentState(department);
    DepartmentDetailModalBodyListener.setImagesState([]);

    DepartmentDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkCopy(departmentId) {
    this.setState({ copied: true });
    this.setState({ copiedDepartmentId: departmentId });
    this.setState({ copiedEffect: true });

    const interval = 2000;

    const promise = promiseDelay(interval, false);

    promise.then(() => {
      this.setState({ copiedEffect: false });
    });
  }

  render() {
    const { departments, copiedEffect, copiedDepartmentId } = this.state;

    return (
      <tbody>
        {
          departments.length > 0
            ? (
              departments.map((p, i) =>
                <tr key={p._id}>
                  <td className="text-center">
                    {i + 1}
                  </td>
                  <td className="text-center">
                    <div className="avatar">
                      <img
                        src={p.image_url
                          ? p.image_url
                          : notFound}
                        className="img-avatar"
                        alt="getsuperez@gmail.com"
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    {p.name}
                  </td>
                  <td className="text-center">
                    {p.description}
                  </td>
                  <td
                    className="text-center"
                    style={{
                      width: '25%'
                    }}
                  >
                    <button
                      data-toggle="modal"
                      data-target="#primaryModal"
                      type="button"
                      className="btn btn-square btn-outline-primary"
                      value={p._id}
                      onClick={() => this.handleGetDepartmentClick(p._id)}
                    >
                      <i className="fa fa-eye"></i> View
                    </button>

                    <CopyToClipboard
                      text={`https://admin.getsuperez.com/departments/${p._id}`}
                      onCopy={() => this.handleCopyLinkCopy(p._id)}>
                      {
                        copiedEffect && p._id === copiedDepartmentId ? (
                          <button
                            type="button"
                            className="btn btn-square btn-primary "
                          >
                            <i className="fa fa-link"></i> Copied!
                          </button>
                        ) : (
                            <button
                              type="button"
                              className="btn btn-square btn-outline-primary "
                            >
                              <i className="fa fa-link"></i> Copy Link
                          </button>
                          )
                      }
                    </CopyToClipboard>
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td className="text-center" colSpan="5">
                  No results found
                </td>
              </tr>
            )
        }
      </tbody>
    );
  }
}

export default DepartmentListBody;
