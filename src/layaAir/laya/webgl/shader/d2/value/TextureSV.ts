import { RenderSpriteData, Value2D } from "./Value2D";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { Vector2 } from "../../../../maths/Vector2";
import { Vector4 } from "../../../../maths/Vector4";
import { Matrix4x4 } from "../../../../maths/Matrix4x4";
import { ShaderDefines2D } from "../ShaderDefines2D";

export class TextureSV extends Value2D {
    strength: number = 0;//TODO  delete？？

    private _blurInfo: Vector2 = new Vector2();//TODO  shader中没有用
    public get blurInfo(): Vector2 {
        return this.defines.getVector2(ShaderDefines2D.UNIFORM_BLURINFO);
    }
    public set blurInfo(value: Vector2) {
        this.defines.setVector2(ShaderDefines2D.UNIFORM_BLURINFO, value);
    }

    private _u_blurInfo1: Vector4 = new Vector4();
    public get u_blurInfo1(): Vector4 {
        return this.defines.getVector(ShaderDefines2D.UNIFORM_BLURINFO1);
    }
    public set u_blurInfo1(value: Vector4) {
        this.defines.setVector(ShaderDefines2D.UNIFORM_BLURINFO1, value);
    }

    private _u_blurInfo2: Vector4 = new Vector4();
    public get u_blurInfo2(): Vector4 {
        return this.defines.getVector(ShaderDefines2D.UNIFORM_BLURINFO2);
    }
    public set u_blurInfo2(value: Vector4) {
        this.defines.setVector(ShaderDefines2D.UNIFORM_BLURINFO2, value);
    }

    private _u_TexRange: Vector4 = new Vector4();
    public get u_TexRange(): Vector4 {
        return this.defines.getVector(ShaderDefines2D.UNIFORM_TEXRANGE)
    }
    public set u_TexRange(value: Vector4) {
        this.defines.setVector(ShaderDefines2D.UNIFORM_TEXRANGE, value);
    }
    private _colorMat: Matrix4x4 = new Matrix4x4();
    public get colorMat(): Matrix4x4 {
        return this.defines.getMatrix4x4(ShaderDefines2D.UNIFORM_COLORMAT);
    }
    public set colorMat(value: Matrix4x4) {
        this.defines.setMatrix4x4(ShaderDefines2D.UNIFORM_COLORMAT, value);
    }

    private _colorAlpha: Vector4 = new Vector4();
    public get colorAlpha(): Vector4 {
        return this.defines.getVector(ShaderDefines2D.UNIFORM_COLORALPHA);
    }
    public set colorAlpha(value: Vector4) {
        this.defines.setVector(ShaderDefines2D.UNIFORM_COLORALPHA, value);
    }

    private _strength_sig2_2sig2_gauss1: Vector4 = new Vector4();
    public get strength_sig2_2sig2_gauss1(): Vector4 {
        return this.defines.getVector(ShaderDefines2D.UNIFORM_STRENGTH_SIG2_2SIG2_GAUSS1);
    }
    public set strength_sig2_2sig2_gauss1(value: Vector4) {
        this.defines.setVector(ShaderDefines2D.UNIFORM_STRENGTH_SIG2_2SIG2_GAUSS1, value);
    }

    constructor() {
        super(RenderSpriteData.Texture2D);
        this._defaultShader = Shader3D.find("Sprite2DTexture");
        this.blurInfo = this._blurInfo;
        this.u_blurInfo1 = this._u_blurInfo1;
        this.u_blurInfo2 = this._u_blurInfo2;
        this.u_TexRange = this._u_TexRange;
        this.colorMat = this._colorMat;
        this.colorAlpha = this._colorAlpha;
        this.strength_sig2_2sig2_gauss1 = this._strength_sig2_2sig2_gauss1;
    }
    /**
     * @override
     */
    clear(): void {
        this.texture = null;
        //this.shader = null;
        this.defines._defineDatas.clear();

    }
}
